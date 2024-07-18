'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/footer'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material'
import { useTranslation } from '@/context/TranslationContext'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

interface Plant {
  _id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  soilComposition: string
  soilCompositionEn: string
  homeTemperature: string
  homeTemperatureEn: string
  sunlightExposure: string
  sunlightExposureEn: string
  image: string
}

interface Garden {
  _id: string
  name: string
  plants: Plant[]
}

export default function Component() {
  const { id } = useParams()
  const { user, setRedirectedFrom, clearRedirectedFrom, redirectedFrom } =
    useAuth()
  const router = useRouter()
  const [plantInfo, setPlantInfo] = useState<Plant | null>(null)
  const [loading, setLoading] = useState(false)
  const [isPlantInGarden, setIsPlantInGarden] = useState(false)
  const [open, setOpen] = useState(false)
  const { locale, t } = useTranslation()

  // Modal form states
  const [soilType, setSoilType] = useState('')
  const [customSoilType, setCustomSoilType] = useState('')
  const [lightType, setLightType] = useState('')
  const [lastWateredDate, setLastWateredDate] = useState('')
  const [sideType, setSideType] = useState('')
  const [potSize, setPotSize] = useState('')

  useEffect(() => {
    if (id) {
      const plantId = Array.isArray(id) ? id[0] : id
      fetchPlantInfo(plantId)
    }
  }, [id])

  useEffect(() => {
    if (user && id) {
      const plantId = Array.isArray(id) ? id[0] : id
      checkUserGarden(plantId)
      if (redirectedFrom) {
        handleAddToGardenAfterLogin()
      }
    }
  }, [user, id])

  const fetchPlantInfo = async (plantId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/plants/${plantId}`
      )
      setPlantInfo(response.data)
    } catch (error) {
      console.error('Error fetching plant info:', error)
    }
  }

  const checkUserGarden = async (plantId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/gardens/user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        }
      )
      const garden = response.data
      const plantExists = garden.plants.some(
        (plant: Plant) => plant._id === plantId
      )
      setIsPlantInGarden(plantExists)
    } catch (error) {
      console.error('Error checking user garden:', error)
    }
  }

  const redirectToLogin = () => {
    if (typeof window !== 'undefined') {
      setRedirectedFrom(window.location.pathname)
    }
    router.push(`/${locale}/signup`)
  }

  const handleAddToGarden = () => {
    if (!user) {
      redirectToLogin()
      return
    }

    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAddToGardenAfterLogin = () => {
    if (redirectedFrom && redirectedFrom.includes(`/plants/${id}`)) {
      handleAddToGarden()
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const plantUpdate = {
        name: plantInfo?.name,
        description: plantInfo?.description,
        userSoilComposition: soilType === 'custom' ? customSoilType : soilType,
        userSunlightExposure: lightType,
        userSideType: sideType,
        lastWateredDate,
        potSize
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/plants/update/${id}`,
        plantUpdate,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        }
      )

      if (response.status === 200) {
        // After updating the plant, add it to the user's garden if not already present
        try {
          let gardenResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/gardens/user/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`
              }
            }
          )

          let garden: Garden = gardenResponse.data

          if (!garden.plants.some((plant: Plant) => plant._id === id)) {
            await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/gardens/add_plant`,
              {
                gardenId: garden._id,
                plantId: id
              },
              {
                headers: {
                  Authorization: `Bearer ${user.accessToken}`
                }
              }
            )
          }

          setIsPlantInGarden(true)
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            // If the user doesn't have a garden, create one
            const gardenResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/gardens/create`,
              {
                name: `${user.username}'s Garden`,
                userIds: [user._id],
                plantIds: [id]
              },
              {
                headers: {
                  Authorization: `Bearer ${user.accessToken}`
                }
              }
            )
            setIsPlantInGarden(true)
          } else {
            throw error
          }
        }
        setOpen(false)
      }
    } catch (error) {
      console.error('Error updating plant:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!plantInfo) {
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <Header bgColor="bg-[#F0F8F0]" />
        <main className="flex-1 flex items-center justify-center bg-[#F0F8F0]">
          <CircularProgress color="success" />
        </main>
        <Footer bgColor="bg-[#F0F8F0]" />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header bgColor="bg-[#F0F8F0]" />
      <main className="flex-1 mt-14 px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-[#F0F8F0]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <Image
                src={plantInfo.image}
                alt={plantInfo.name}
                width={400}
                height={400}
                className="rounded-lg object-cover w-full aspect-square"
                style={{ borderRadius: '10px' }}
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4CAF50]">
                  {locale === 'en' ? plantInfo.nameEn : plantInfo.name}
                </h1>
                <p className="max-w-[600px] text-[#6A6A6A] md:text-xl">
                  {locale === 'en'
                    ? plantInfo.descriptionEn
                    : plantInfo.description}
                </p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-6 w-6 text-[#4CAF50]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                    <path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17" />
                    <path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-[#4CAF50]">
                      {t('soilComposition')}
                    </h3>
                    <p className="text-[#6A6A6A]">
                      {locale === 'en'
                        ? plantInfo.soilCompositionEn
                        : plantInfo.soilComposition}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-6 w-6 text-[#4CAF50]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-[#4CAF50]">
                      {t('homeTemperature')}
                    </h3>
                    <p className="text-[#6A6A6A]">
                      {locale === 'en'
                        ? plantInfo.homeTemperatureEn
                        : plantInfo.homeTemperature}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-6 w-6 text-[#4CAF50]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-[#4CAF50]">
                      {t('sunlightExposure')}
                    </h3>
                    <p className="text-[#6A6A6A]">
                      {locale === 'en'
                        ? plantInfo.sunlightExposureEn
                        : plantInfo.sunlightExposure}
                    </p>
                  </div>
                </div>
              </div>
              {!isPlantInGarden ? (
                <Button
                  type="button"
                  className="w-full rounded-md bg-[#4CAF50] px-4 py-2 text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  style={{ borderRadius: '5px' }}
                  onClick={handleAddToGarden}
                  disabled={loading}
                >
                  {loading ? t('adding') : t('addToGarden')}
                </Button>
              ) : (
                <Link href={`/${locale}/garden/${user._id}`} passHref>
                  <Button
                    type="button"
                    className="w-full rounded-md pt-4 bg-[#4CAF50] px-4 py-2 text-white transition-colors hover:bg-[#3D8E40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    style={{ borderRadius: '5px' }}
                  >
                    {t('userGarden')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer bgColor="bg-[#F0F8F0]" />

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#F0F8F0'
          }
        }}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, color: '#4CAF50' }}
          id="customized-dialog-title"
        >
          {t('infoAboutPlant')}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            {/* Растение успешно добавлено в ваш сад. */}
          </Typography>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="soil-select-label">{t('soilType')}</InputLabel>
            <Select
              labelId="soil-select-label"
              id="soil-select"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              label={t('soilType')}
            >
              <MenuItem value="Универсальный грунт">{t('soilType1')}</MenuItem>
              <MenuItem value="Суккулентный и кактусовый грунт">
                {t('soilType2')}
              </MenuItem>
              <MenuItem value="Орхидейный субстрат">{t('soilType3')}</MenuItem>
              <MenuItem value="custom">{t('soilType4Custom')}</MenuItem>
            </Select>
            {soilType === 'custom' && (
              <TextField
                label={t('soilType4Custom')}
                variant="outlined"
                fullWidth
                value={customSoilType}
                onChange={(e) => setCustomSoilType(e.target.value)}
                sx={{ mt: 2 }}
              />
            )}
          </FormControl>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="light-select-label">{t('sunlightType')}</InputLabel>
            <Select
              labelId="light-select-label"
              id="light-select"
              value={lightType}
              onChange={(e) => setLightType(e.target.value)}
              label={t('sunlightType')}
            >
              <MenuItem value="Естественное освещение">
                {t('sunlightType1')}
              </MenuItem>
              <MenuItem value="Флуоресцентное освещение">
                {t('sunlightType2')}
              </MenuItem>
              <MenuItem value="Светодиодное (LED) освещение">
                {t('sunlightType3')}
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="side-select-label">{t('sideType')}</InputLabel>
            <Select
              labelId="side-select-label"
              id="side-select"
              value={sideType}
              onChange={(e) => setSideType(e.target.value)}
              label={t('sideType')}
            >
              <MenuItem value="Солнечная сторона">{t('sideType1')}</MenuItem>
              <MenuItem value="Темная сторона">{t('sideType2')}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label={t('lastWateredDate')}
            type="date"
            fullWidth
            sx={{ my: 2 }}
            InputLabelProps={{
              shrink: true
            }}
            value={lastWateredDate}
            onChange={(e) => setLastWateredDate(e.target.value)}
          />
          <TextField
            label={t('potSize')}
            type="text"
            fullWidth
            sx={{ my: 2 }}
            value={potSize}
            onChange={(e) => setPotSize(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleSubmit}
            className="text-[#4CAF50]"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : t('add')}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
