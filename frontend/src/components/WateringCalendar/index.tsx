// 'use client'

// import * as React from 'react'
// import dayjs, { Dayjs } from 'dayjs'
// import { useEffect, useState } from 'react'
// import ReactDatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import './calendar.css'

// interface WateringCalendarProps {
//   wateringFrequency: number
//   lastWateredDate: Date
// }

// const WateringCalendar = ({
//   wateringFrequency,
//   lastWateredDate
// }: WateringCalendarProps) => {
//   const [wateringDates, setWateringDates] = useState<Dayjs[]>([])

//   useEffect(() => {
//     const dates: Dayjs[] = []
//     const daysBetweenWatering = Math.floor(7 / wateringFrequency)
//     let currentDate = dayjs(lastWateredDate)

//     while (currentDate.isBefore(dayjs().endOf('month'))) {
//       dates.push(currentDate)
//       currentDate = currentDate.add(daysBetweenWatering, 'day')
//     }
//     setWateringDates(dates)
//     console.log('Updated wateringDates:', dates) // Log the updated watering dates
//   }, [wateringFrequency, lastWateredDate])

//   const isWateringDay = (date: Date) => {
//     return wateringDates.some((wateringDate) =>
//       wateringDate.isSame(dayjs(date), 'day')
//     )
//   }

//   return (
//     <ReactDatePicker
//       inline
//       highlightDates={wateringDates.map((date) => date.toDate())}
//       dayClassName={(date) => (isWateringDay(date) ? 'highlighted-day' : '')}
//     />
//   )
// }

// export default WateringCalendar
'use client'

import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './calendar.css'

interface WateringCalendarProps {
  wateringFrequency: number
  lastWateredDate: Date
}

const WateringCalendar = ({
  wateringFrequency,
  lastWateredDate
}: WateringCalendarProps) => {
  const [wateringDates, setWateringDates] = useState<Dayjs[]>([])

  useEffect(() => {
    const dates: Dayjs[] = []
    const daysBetweenWatering = Math.floor(7 / wateringFrequency)
    let currentDate = dayjs(lastWateredDate)

    while (currentDate.isBefore(dayjs().endOf('month'))) {
      dates.push(currentDate)
      currentDate = currentDate.add(daysBetweenWatering, 'day')
    }
    setWateringDates(dates)
    console.log('Updated wateringDates:', dates) // Log the updated watering dates
  }, [wateringFrequency, lastWateredDate])

  const isWateringDay = (date: Date) => {
    return wateringDates.some((wateringDate) =>
      wateringDate.isSame(dayjs(date), 'day')
    )
  }

  return (
    <div className="p-4 mx-auto md:mx-0 rounded-lg">
      <ReactDatePicker
        inline
        highlightDates={wateringDates.map((date) => date.toDate())}
        dayClassName={(date) => (isWateringDay(date) ? 'highlighted-day' : '')}
      />
    </div>
  )
}

export default WateringCalendar
