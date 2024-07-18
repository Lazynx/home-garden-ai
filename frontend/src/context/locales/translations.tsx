const translations = {
  en: {
    home: 'Home',
    scan: 'Scan',
    diagnose: 'Diagnose',
    garden: 'Garden',
    login: 'Login',
    logout: 'Logout',
    hello: 'Hello',
    userGarden: 'My garden',
    mainHeroTitle: (
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-[#4CAF50]">
        Transform your <span className="text-[#0A6847]">home garden</span> with
        ease
      </h1>
    ),
    mainHeroSubtitle: 'Do not miss any detail in plant care.',
    buttonStart: 'Start',
    buttonDetail: 'See more details',
    mainSectionSubtitle: 'Easy care of plants',
    mainSectionPar:
      'Our HomeGardenAI app will save you the guesswork of caring for plants by providing personalized recommendations and tips to make your indoor and garden plants thrive.',
    careRecommendations: 'Care Recommendations',
    careRecommendationsText:
      'Get personalized care advice for your plants, considering their specific needs and your environment.',
    growthTracking: 'Growth Tracking',
    growthTrackingText:
      'Monitor the progress of your plants and receive notifications about any changes in their condition.',
    personalizedTips: 'Personalized Tips',
    personalizedTipsText:
      'Receive individualized tips and recommendations to help your plants thrive in your unique environment.',
    plantUpload: 'Upload a photo of your plant',
    fileUpload: 'Upload a file',
    getRecommendations: 'Get recommendations',
    uploadingFile: 'Uploading file to server...',
    processingPhoto: 'AI is processing the photo...',
    identifyingPlant: 'AI is identifying the plant...',
    gettingServerResponse: 'Getting response from server...',
    pleaseWait: 'Please wait...',
    loading: 'Loading...',
    diagnoseHeroTitle: (
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4CAF50]">
        Identify the disease of your{' '}
        <span className="text-[#0A6847]">plant</span>
      </h1>
    ),
    diagnoseHeroSubtitle:
      'Upload an image of the plant and get treatment recommendations.',
    getDiagnose: 'Get a diagnosis',
    registration: 'Registration',
    inputEmail: 'Input your email address',
    username: 'Username',
    inputName: 'Input username',
    passwordCreation: 'Create a password',
    passwordCreationText: 'Input your password',
    passwordConfirmation: 'Confirm your password',
    passwordConfirmationText: 'Input your password again',
    signUpButtonText: 'Register',
    alreadyLoginText: 'Already have an account?',
    hide: 'Hide',
    show: 'Show',
    password: 'Password',
    noAccount: 'No account?',
    soilComposition: 'Soil composition',
    homeTemperature: 'Temperature in the house',
    sunlightExposure: 'Exposure to sunlight',
    adding: 'Adding...',
    addToGarden: 'Add to garden',
    infoAboutPlant: 'Information about your plant',

    soilType: 'Soil type',
    soilType1: 'Universal soil',
    soilType2: 'Succulent and cactus soil',
    soilType3: 'Orchid substrate',
    soilType4Custom: 'Custom soil type',

    sunlightType: 'Sunlight type',
    sunlightType1: 'Natural light',
    sunlightType2: 'Fluorescent light',
    sunlightType3: 'LED light',

    sideType: 'Side',
    sideType1: 'Sunny side',
    sideType2: 'Dark side',

    lastWateredDate: 'Last watered date',
    potSize: 'Pot size (optional)',

    add: 'Add',

    go: 'Go over',

    fertilizer: 'Fertilizers:',
    wateringFrequency: 'Number of waterings per week:',
    noPlantsInGarden: "You haven't added anything to your garden yet.",
    scanPlant: 'Scan the plant',
    initialDiagnosis: 'Initial Diagnosis',
    questions: 'Questions',
    yourAnswer: 'Your answer:',
    submitAnswer: 'Submit your answer',
    finalDiagnosis: 'Final Diagnosis'
  },
  ru: {
    home: 'Главная',
    scan: 'Сканировать',
    diagnose: 'Заболевания',
    garden: 'Общий Сад',
    login: 'Войти',
    logout: 'Выйти',
    hello: 'Здравствуйте',
    userGarden: 'Мой сад',
    mainHeroTitle: (
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-[#4CAF50]">
        Преобразите свой <span className="text-[#0A6847]">домашний сад</span> с
        легкостью
      </h1>
    ),
    mainHeroSubtitle: 'Не упустите ни одной детали в уходе за растениями.',
    buttonStart: 'Начать',
    buttonDetail: 'Узнать больше',
    mainSectionSubtitle: 'Легкий уход за растениями',
    mainSectionPar:
      'Наше приложение HomeGardenAI избавит вас от догадок в уходе за растениями, предоставляя персонализированные рекомендации и советы, чтобы ваши комнатные и садовые растения процветали.',
    careRecommendations: 'Рекомендации по уходу за растениями',
    careRecommendationsText:
      'Получайте персонализированные советы по уходу за вашими растениями с учетом их специфических нужд и вашего окружения.',
    growthTracking: 'Отслеживание роста',
    growthTrackingText:
      'Мониторьте прогресс ваших растений и получайте уведомления о любых изменениях в их состоянии.',
    personalizedTips: 'Персонализированные советы',
    personalizedTipsText:
      'Получайте индивидуальные советы и рекомендации, чтобы ваши растения процветали в уникальных условиях вашего окружения.',
    plantUpload: 'Загрузите фото вашего растения',
    fileUpload: 'Загрузите файл',
    getRecommendations: 'Получить рекомендации',
    uploadingFile: 'Загружаем файл на сервер...',
    processingPhoto: 'ИИ обрабатывает фото...',
    identifyingPlant: 'ИИ идентифицирует растение...',
    gettingServerResponse: 'Получаем ответ с сервера...',
    pleaseWait: 'Пожалуйста подождите...',
    loading: 'Загрузка...',
    diagnoseHeroTitle: (
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4CAF50]">
        Определите болезнь вашего{' '}
        <span className="text-[#0A6847]">растения</span>
      </h1>
    ),
    diagnoseHeroSubtitle:
      'Загрузите изображение растения и получите рекомендации по лечению.',
    getDiagnose: 'Получить диагноз',
    registration: 'Регистрация',
    inputEmail: 'Введите email',
    username: 'Имя пользователя',
    inputName: 'Введите имя пользователя',
    passwordCreation: 'Придумайте пароль',
    passwordCreationText: 'Введите пароль',
    passwordConfirmation: 'Подтвердите пароль',
    passwordConfirmationText: 'Введите пароль еще раз',
    signUpButtonText: 'Зарегистрироваться',
    alreadyLoginText: 'Уже есть аккаунт?',
    hide: 'Скрыть',
    show: 'Показать',
    password: 'Пароль',
    noAccount: 'Нет аккаунта?',
    soilComposition: 'Состав почвы',
    homeTemperature: 'Температура в доме',
    sunlightExposure: 'Воздействие солнечного света',
    adding: 'Добавление...',
    addToGarden: 'Добавить в сад',

    infoAboutPlant: 'Информация о вашем растении',

    soilType: 'Тип почвы',
    soilType1: 'Универсальный грунт',
    soilType2: 'Суккулентный и кактусовый грунт',
    soilType3: 'Орхидейный субстрат',
    soilType4Custom: 'Пользовательский вид почвы',

    sunlightType: 'Тип освещения',
    sunlightType1: 'Естественное освещение',
    sunlightType2: 'Флуоресцентное освещение',
    sunlightType3: 'Cветодиодное (LED) освещение',

    sideType: 'Сторона',
    sideType1: 'Солнечная сторона',
    sideType2: 'Темная сторона',

    lastWateredDate: 'Дата последнего полива',
    potSize: 'Размер горшка (необязательно)',

    add: 'Добавить',

    go: 'Перейти',

    fertilizer: 'Удобрения:',
    wateringFrequency: 'Количество поливов в неделю:',
    noPlantsInGarden: 'Вы еще не добавили ничего в ваш сад.',
    scanPlant: 'Отсканируйте растение',
    initialDiagnosis: 'Предварительный диагноз',
    questions: 'Вопросы:',
    yourAnswer: 'Ваш ответ:',
    submitAnswer: 'Отправить ответ',
    finalDiagnosis: 'Финальный диагноз'
  }
}

export default translations
