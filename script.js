// Инициализация VK Bridge
vkBridge.send('VKWebAppInit').catch(e => console.error('VK init error:', e));

// Данные персонажей
const characters = {
    damon: {
        name: "Деймон Сальваторе",
        description: "Ты - Деймон Сальваторе! Харизматичный, саркастичный и опасный, но в глубине души предан тем, кого любишь. Ты действуешь импульсивно, следуешь своим желаниям и не терпишь скуки. Твой стиль - смесь обаяния и угрозы, а твои шутки часто граничат с жестокостью.",
        image: "images/damon.png"
    },
    stefan: {
        name: "Стефан Сальваторе",
        description: "Ты - Стефан Сальваторе! Благородный, чувствительный и вечно страдающий. Ты стараешься поступать правильно, даже когда это сложно. Твоя романтическая натура и преданность делают тебя идеальным партнером, но твое темное прошлое иногда дает о себе знать.",
        image: "images/stefan.png"
    },
    elena: {
        name: "Елена Гилберт",
        description: "Ты - Елена Гилберт! Добрая, сострадательная и в центре всех драм. Ты искренне заботишься о своих друзьях и семье, но твоя жизнь полна сложных решений и трагедий. Ты привлекаешь к себе людей, даже не осознавая этого.",
        image: "images/elena.png"
    },
    katherine: {
        name: "Кэтрин Пирс",
        description: "Ты - Кэтрин Пирс! Хитрая, манипулятивная и абсолютно непредсказуемая. Ты выживаешь любой ценой и умеешь поворачивать любую ситуацию в свою пользу. Твое обаяние и сексуальность - твое оружие, а умение играть на чувствах других - твоя защита.",
        image: "images/katherine.png"
    },
    caroline: {
        name: "Кэролайн Форбс",
        description: "Ты - Кэролайн Форбс! Перфекционистка, которая превратилась из невротичной школьницы в сильную и уверенную вампиршу. Ты организована, амбициозна и всегда стремишься к лучшему. Ты верный друг и страстный любовник.",
        image: "images/caroline.png"
    },
    enzo: {
        name: "Энзо Сент-Джон",
        description: "Ты - Энзо Сент-Джон! Обаятельный, остроумный и глубоко раненый. Твой британский шарм и сарказм скрывают болезненное прошлое, но те, кто заслужил твое доверие, знают, насколько ты преданный и любящий.",
        image: "images/enzo.png"
    },
    jeremy: {
        name: "Джереми Гилберт",
        description: "Ты - Джереми Гилберт! Бунтарь с добрым сердцем. Ты прошел через многое - потерю родителей, зависимость, воскрешение. Но все это сделало тебя сильнее. Ты художник в душе, чувствительный и творческий.",
        image: "images/jeremy.png"
    },
    matt: {
        name: "Мэтт Донован",
        description: "Ты - Мэтт Донован! Единственный настоящий человек в компании сверхъестественных существ. Ты честный, трудолюбивый и надежный. Хотя ты часто оказываешься втянутым в опасные ситуации, ты сохраняешь здравый смысл и человечность.",
        image: "images/matt.png"
    },
    lily: {
        name: "Лили Сальваторе",
        description: "Ты - Лили Сальваторе! Загадочная и сложная. Как мать Деймона и Стефана, ты сделала много трудных выборов, которые повлияли на жизнь твоих детей. Ты сильная и независимая, но твоя любовь к семье глубока.",
        image: "images/lily.png"
    },
    bonnie: {
        name: "Бонни Беннет",
        description: "Ты - Бонни Беннет! Сильная ведьма с добрым сердцем. Ты постоянно жертвуешь собой ради других, используя свою магию, чтобы защищать друзей. Ты умна, преданна и невероятно сильна, хотя часто недооцениваешь себя.",
        image: "images/bonnie.png"
    },
    klaus: {
        name: "Клаус Майклсон",
        description: "Ты - Клаус Майклсон! Опасный, непредсказуемый и глубоко раненый. Ты гибрид - и в этом твоя сила и твое проклятие. Ты жесток, когда нужно, но способен на глубокую любовь и преданность.",
        image: "images/klaus.png"
    },
    elijah: {
        name: "Элайджа Майклсон",
        description: "Ты - Элайджа Майклсон! Благородный, старомодный джентльмен с темным прошлым. Ты всегда безупречно одет, вежлив и хладнокровен. Ты веришь в честь и семью, хотя твоя семья далека от идеала.",
        image: "images/elijah.png"
    },
    rebekah: {
        name: "Ребекка Майклсон",
        description: "Ты - Ребекка Майклсон! Эмоциональная, страстная и жаждущая нормальной жизни. Ты провела столетия в тени своих братьев, мечтая о любви и семье. Ты можешь быть жестокой, когда тебя предают, но в душе ты просто хочешь быть любимой.",
        image: "images/rebekah.png"
    }
};

// Все 50 вопросов
const allQuestions = [
    {
        question: "Как бы ты поступил в критической ситуации?",
        options: [
            { text: "Действовал бы импульсивно, доверяя инстинктам", characters: { damon: 2, klaus: 2, rebekah: 1 } },
            { text: "Попытался бы найти мирное решение", characters: { stefan: 2, elijah: 2, elena: 1 } },
            { text: "Разработал бы детальный план", characters: { caroline: 2, enzo: 2, bonnie: 1 } },
            { text: "Искал бы помощи у друзей", characters: { jeremy: 2, matt: 2, lily: 1 } }
        ]
    },
    {
        question: "Какой твой главный мотиватор в жизни?",
        options: [
            { text: "Любовь и отношения", characters: { elena: 2, stefan: 2, rebekah: 1 } },
            { text: "Власть и контроль", characters: { klaus: 2, katherine: 2, damon: 1 } },
            { text: "Семья и верность", characters: { elijah: 2, lily: 2, bonnie: 1 } },
            { text: "Выживание любой ценой", characters: { enzo: 2, jeremy: 2, matt: 1 } }
        ]
    },
    {
        question: "Как ты относишься к правилам?",
        options: [
            { text: "Правила созданы, чтобы их нарушать", characters: { damon: 2, katherine: 2, klaus: 1 } },
            { text: "Стараюсь следовать правилам, если они справедливы", characters: { stefan: 2, elijah: 2, elena: 1 } },
            { text: "Правила важны для порядка", characters: { caroline: 2, bonnie: 2, lily: 1 } },
            { text: "Зависит от ситуации", characters: { enzo: 2, jeremy: 2, rebekah: 1 } }
        ]
    },
    {
        question: "Твой подход к любви?",
        options: [
            { text: "Страстный и всепоглощающий", characters: { damon: 2, klaus: 2, rebekah: 1 } },
            { text: "Романтичный и преданный", characters: { stefan: 2, elijah: 2, elena: 1 } },
            { text: "Осторожный, не доверяю легко", characters: { katherine: 2, enzo: 2, bonnie: 1 } },
            { text: "Мечтаю о настоящей любви", characters: { caroline: 2, jeremy: 2, matt: 1 } }
        ]
    },
    {
        question: "Что для тебя важнее всего?",
        options: [
            { text: "Свобода и независимость", characters: { damon: 2, katherine: 2, rebekah: 1 } },
            { text: "Семья и близкие", characters: { elijah: 2, stefan: 2, lily: 1 } },
            { text: "Честь и принципы", characters: { bonnie: 2, matt: 2, elena: 1 } },
            { text: "Власть и влияние", characters: { klaus: 2, caroline: 2, enzo: 1 } }
        ]
    },
    {
        question: "Как ты справляешься с предательством?",
        options: [
            { text: "Мщу жестоко и изобретательно", characters: { klaus: 2, damon: 2, katherine: 1 } },
            { text: "Прощаю, но не забываю", characters: { stefan: 2, elijah: 2, bonnie: 1 } },
            { text: "Стараюсь понять причины", characters: { elena: 2, jeremy: 2, matt: 1 } },
            { text: "Закрываюсь и больше не доверяю", characters: { enzo: 2, rebekah: 2, lily: 1 } }
        ]
    },
    {
        question: "Какое твое самое сильное качество?",
        options: [
            { text: "Харизма и обаяние", characters: { damon: 2, katherine: 2, elijah: 1 } },
            { text: "Сила и выносливость", characters: { klaus: 2, rebekah: 2, enzo: 1 } },
            { text: "Преданность и верность", characters: { stefan: 2, bonnie: 2, lily: 1 } },
            { text: "Человечность и сострадание", characters: { elena: 2, jeremy: 2, matt: 1 } }
        ]
    },
    {
        question: "Как ты ведешь себя на вечеринке?",
        options: [
            { text: "Я душа компании", characters: { damon: 2, katherine: 2, caroline: 1 } },
            { text: "Наблюдаю со стороны", characters: { stefan: 2, elijah: 2, bonnie: 1 } },
            { text: "Общаюсь с близким кругом", characters: { elena: 2, jeremy: 2, matt: 1 } },
            { text: "Ухожу пораньше", characters: { enzo: 2, lily: 2, rebekah: 1 } }
        ]
    },
    {
        question: "Твой идеальный вечер?",
        options: [
            { text: "Шумная вечеринка", characters: { damon: 2, katherine: 2, caroline: 1 } },
            { text: "Романтический ужин", characters: { stefan: 2, elena: 2, elijah: 1 } },
            { text: "Чтение книги у камина", characters: { bonnie: 2, enzo: 2, lily: 1 } },
            { text: "Просмотр фильмов с друзьями", characters: { jeremy: 2, matt: 2, rebekah: 1 } }
        ]
    },
    {
        question: "Как ты относишься к риску?",
        options: [
            { text: "Обожаю рисковать", characters: { damon: 2, klaus: 2, katherine: 1 } },
            { text: "Рискую, только если это необходимо", characters: { stefan: 2, elijah: 2, caroline: 1 } },
            { text: "Стараюсь избегать риска", characters: { elena: 2, matt: 2, bonnie: 1 } },
            { text: "Зависит от ситуации", characters: { enzo: 2, jeremy: 2, rebekah: 1 } }
        ]
    },
    {
        question: "Твое отношение к семье?",
        options: [
            { text: "Семья - это святое", characters: { elijah: 2, stefan: 2, lily: 1 } },
            { text: "Семья - это те, кого ты выбираешь", characters: { damon: 2, bonnie: 2, enzo: 1 } },
            { text: "Семья меня разочаровала", characters: { klaus: 2, katherine: 2, rebekah: 1 } },
            { text: "У меня нет семьи", characters: { jeremy: 2, matt: 2, caroline: 1 } }
        ]
    },
    {
        question: "Как ты принимаешь решения?",
        options: [
            { text: "Импульсивно, по настроению", characters: { damon: 2, klaus: 2, rebekah: 1 } },
            { text: "Взвешиваю все за и против", characters: { stefan: 2, elijah: 2, bonnie: 1 } },
            { text: "Советуюсь с близкими", characters: { elena: 2, jeremy: 2, matt: 1 } },
            { text: "Долго сомневаюсь", characters: { caroline: 2, enzo: 2, lily: 1 } }
        ]
    },
    {
        question: "Твой стиль одежды?",
        options: [
            { text: "Стильный и элегантный", characters: { damon: 2, elijah: 2, katherine: 1 } },
            { text: "Классический и сдержанный", characters: { stefan: 2, bonnie: 2, lily: 1 } },
            { text: "Модный и современный", characters: { caroline: 2, rebekah: 2, jeremy: 1 } },
            { text: "Простой и удобный", characters: { matt: 2, enzo: 2, elena: 1 } }
        ]
    },
    {
        question: "Как ты ведешь себя в конфликте?",
        options: [
            { text: "Атакую первым", characters: { damon: 2, klaus: 2, katherine: 1 } },
            { text: "Ищу компромисс", characters: { stefan: 2, elijah: 2, bonnie: 1 } },
            { text: "Стараюсь избежать конфликта", characters: { elena: 2, matt: 2, lily: 1 } },
            { text: "Использую хитрость", characters: { enzo: 2, caroline: 2, rebekah: 1 } }
        ]
    },
    {
        question: "Твое отношение к деньгам?",
        options: [
            { text: "Тратю не задумываясь", characters: { damon: 2, klaus: 2, katherine: 1 } },
            { text: "Разумно распоряжаюсь", characters: { elijah: 2, caroline: 2, stefan: 1 } },
            { text: "Экономлю", characters: { bonnie: 2, matt: 2, jeremy: 1 } },
            { text: "Не придаю значения", characters: { enzo: 2, rebekah: 2, elena: 1 } }
        ]
    },
    {
        question: "Твой любимый напиток?",
        options: [
            { text: "Виски", characters: { damon: 2, klaus: 2, elijah: 1 } },
            { text: "Вино", characters: { stefan: 2, katherine: 2, rebekah: 1 } },
            { text: "Кровь (конечно же!)", characters: { enzo: 2, caroline: 2, lily: 1 } },
            { text: "Кофе", characters: { bonnie: 2, elena: 2, matt: 1 } }
        ]
    },
    {
        question: "Как ты относишься к одиночеству?",
        options: [
            { text: "Люблю одиночество", characters: { damon: 2, klaus: 2, enzo: 1 } },
            { text: "Терплю, но не люблю", characters: { stefan: 2, elijah: 2, bonnie: 1 } },
            { text: "Ненавижу быть один", characters: { elena: 2, rebekah: 2, jeremy: 1 } },
            { text: "Мне все равно", characters: { katherine: 2, matt: 2, caroline: 1 } }
        ]
    },
    {
        question: "Твое хобби?",
        options: [
            { text: "Музыка", characters: { damon: 2, stefan: 2, jeremy: 1 } },
            { text: "Чтение", characters: { elijah: 2, bonnie: 2, enzo: 1 } },
            { text: "Спорт", characters: { matt: 2, caroline: 2, rebekah: 1 } },
            { text: "Искусство", characters: { klaus: 2, elena: 2, lily: 1 } }
        ]
    },
    {
        question: "Твой самый большой страх?",
        options: [
            { text: "Потерять близких", characters: { stefan: 2, elena: 2, jeremy: 1 } },
            { text: "Быть преданным", characters: { damon: 2, enzo: 2, rebekah: 1 } },
            { text: "Остаться в одиночестве", characters: { klaus: 2, katherine: 2, lily: 1 } },
            { text: "Не реализовать себя", characters: { caroline: 2, bonnie: 2, matt: 1 } }
        ]
    },
    {
        question: "Как ты относишься к изменам?",
        options: [
            { text: "Это непростительно", characters: { stefan: 2, elijah: 2, bonnie: 1 } },
            { text: "Зависит от ситуации", characters: { damon: 2, enzo: 2, rebekah: 1 } },
            { text: "Это часть жизни", characters: { klaus: 2, katherine: 2, caroline: 1 } },
            { text: "Никогда не задумывался", characters: { matt: 2, jeremy: 2, elena: 1 } }
        ]
    },
    {
        question: "Твой стиль общения?",
        options: [
            { text: "Прямолинейный", characters: { damon: 2, klaus: 2, rebekah: 1 } },
            { text: "Дипломатичный", characters: { stefan: 2, elijah: 2, bonnie: 1 } },
            { text: "Хитрый", characters: { katherine: 2, enzo: 2, caroline: 1 } },
            { text: "Закрытый", characters: { matt: 2, jeremy: 2, lily: 1 } }
        ]
    },
    {
        question: "Как ты относишься к власти?",
        options: [
            { text: "Стремлюсь к власти", characters: { klaus: 2, katherine: 2, damon: 1 } },
            { text: "Использую власть для блага", characters: { elijah: 2, stefan: 2, bonnie: 1 } },
            { text: "Избегаю власти", characters: { elena: 2, matt: 2, jeremy: 1 } },
            { text: "Не задумываюсь об этом", characters: { enzo: 2, rebekah: 2, caroline: 1 } }
        ]
    },
    {
        question: "Твое отношение к смерти?",
        options: [
            { text: "Не боюсь смерти", characters: { damon: 2, klaus: 2, katherine: 1 } },
            { text: "Принимаю как часть жизни", characters: { stefan: 2, elijah: 2, bonnie: 1 } },
            { text: "Боюсь смерти", characters: { elena: 2, jeremy: 2, matt: 1 } },
            { text: "Никогда не думал об этом", characters: { enzo: 2, rebekah: 2, caroline: 1 } }
        ]
    },
    {
        question: "Как ты относишься к магии?",
        options: [
            { text: "Использую в своих целях", characters: { klaus: 2, katherine: 2, damon: 1 } },
            { text: "Уважаю, но осторожен", characters: { stefan: 2, elijah: 2, elena: 1 } },
            { text: "Пользуюсь для помощи другим", characters: { bonnie: 2, lily: 2, caroline: 1 } },
            { text: "Боюсь магии", characters: { matt: 2, jeremy: 2, rebekah: 1 } }
        ]
    },
    {
        question: "Твое отношение к вампирам?",
        options: [
            { text: "Я вампир и горжусь этим", characters: { damon: 2, klaus: 2, katherine: 1 } },
            { text: "Я вампир, но сожалею об этом", characters: { stefan: 2, elijah: 2, rebekah: 1 } },
            { text: "Я человек и хочу остаться им", characters: { elena: 2, matt: 2, jeremy: 1 } },
            { text: "Я ведьма и мне все равно", characters: { bonnie: 2, lily: 2, caroline: 1 } }
        ]
    },
    {
        question: "Как ты относишься к человечеству?",
        options: [
            { text: "Презираю слабость людей", characters: { klaus: 2, katherine: 2, damon: 1 } },
            { text: "Завидую их простоте", characters: { stefan: 2, elijah: 2, rebekah: 1 } },
            { text: "Хочу быть человеком", characters: { elena: 2, jeremy: 2, matt: 1 } },
            { text: "Они - пища, не более", characters: { enzo: 2, caroline: 2, lily: 1 } }
        ]
    },
    {
        question: "Твое отношение к религии?",
        options: [
            { text: "Я верующий", characters: { stefan: 2, elena: 2, bonnie: 1 } },
            { text: "Агностик", characters: { damon: 2, elijah: 2, enzo: 1 } },
            { text: "Атеист", characters: { klaus: 2, katherine: 2, rebekah: 1 } },
            { text: "Никогда не задумывался", characters: { matt: 2, jeremy: 2, caroline: 1 } }
        ]
    },
    {
        question: "Как ты относишься к убийству?",
        options: [
            { text: "Это часть моей природы", characters: { damon: 2, klaus: 2, katherine: 1 } },
            { text: "Только в крайних случаях", characters: { stefan: 2, elijah: 2, bonnie: 1 } },
            { text: "Это непростительно", characters: { elena: 2, matt: 2, jeremy: 1 } },
            { text: "Зависит от ситуации", characters: { enzo: 2, rebekah: 2, caroline: 1 } }
        ]
    },
    {
        question: "Твое отношение к дружбе?",
        options: [
            { text: "У меня мало настоящих друзей", characters: { damon: 2, klaus: 2, enzo: 1 } },
            { text: "Дружба - это святое", characters: { stefan: 2, elena: 2, bonnie: 1 } },
            { text: "Друзья приходят и уходят", characters: { katherine: 2, rebekah: 2, caroline: 1 } },
            { text: "Я не нуждаюсь в друзьях", characters: { elijah: 2, lily: 2, matt: 1 } }
        ]
    },
    {
        question: "Как ты относишься к своим врагам?",
        options: [
            { text: "Уничтожаю без сожалений", characters: { damon: 2, klaus: 2, katherine: 1 } },
            { text: "Даю второй шанс", characters: { stefan: 2, elijah: 2, bonnie: 1 } },
            { text: "Стараюсь избегать конфликтов", characters: { elena: 2, matt: 2, jeremy: 1 } },
            { text: "Превращаю врагов в союзников", characters: { enzo: 2, caroline: 2, rebekah: 1 } }
        ]
    },
    {
        question: "Твое отношение к прошлому?",
        options: [
            { text: "Живу прошлым", characters: { damon: 2, stefan: 2, rebekah: 1 } },
            { text: "Уроки прошлого важны", characters: { elijah: 2, bonnie: 2, lily: 1 } },
            { text: "Стараюсь забыть прошлое", characters: { klaus: 2, katherine: 2, enzo: 1 } },
            { text: "Живу настоящим", characters: { elena: 2, jeremy: 2, matt: 1 } }
        ]
    },
    {
        question: "Как ты относишься к своей внешности?",
        options: [
            { text: "Я осознаю свою привлекательность", characters: { damon: 2, katherine: 2, caroline: 1 } },
            { text: "Не придаю значения", characters: { stefan: 2, elijah: 2, bonnie: 1 } },
            { text: "Стесняюсь своей внешности", characters: { elena: 2, jeremy: 2, matt: 1 } },
            { text: "Использую как оружие", characters: { klaus: 2, rebekah: 2, enzo: 1 } }
        ]
    },
    {
        question: "Твое отношение к деньгам?",
        options: [
            { text: "Деньги - это власть", characters: { klaus: 2, katherine: 2, damon: 1 } },
            { text: "Деньги - средство для благотворительности", characters: { stefan: 2, elijah: 2, bonnie: 1 } },
            { text: "Деньги не важны", characters: { elena: 2, jeremy: 2, matt: 1 } },
            { text: "Люблю роскошь", characters: { caroline: 2, rebekah: 2, enzo: 1 } }
        ]
    },
    {
        question: "Как ты относишься к человеческой пище?",
        options: [
            { text: "Ненавижу", characters: { damon: 2, klaus: 2, katherine: 1 } },
            { text: "Скучаю по ней", characters: { stefan: 2, elijah: 2, rebekah: 1 } },
            { text: "Люблю человеческую еду", characters: { elena: 2, jeremy: 2, matt: 1 } },
            { text: "Мне все равно", characters: { bonnie: 2, lily: 2, caroline: 1 } }
        ]
    },
    {
        question: "Твое отношение к солнцу?",
        options: [
            { text: "Ненавижу солнечный свет", characters: { damon: 2, klaus: 2, katherine: 1 } },
            { text: "Скучаю по солнцу", characters: { stefan: 2, elijah: 2, rebekah: 1 } },
            { text: "Люблю солнечные дни", characters: { elena: 2, jeremy: 2, matt: 1 } },
            { text: "Мне все равно", characters: { bonnie: 2, lily: 2, caroline: 1 } }
        ]
    },
    {
        question: "Как ты относишься к своему возрасту?",
        options: [
            { text: "Горжусь своей мудростью", characters: { klaus: 2, elijah: 2, rebekah: 1 } },
            { text: "Хотел бы быть моложе", characters: { damon: 2, stefan: 2, katherine: 1 } },
            { text: "Хочу повзрослеть", characters: { elena: 2, jeremy: 2, matt: 1 } },
            { text: "Возраст - это просто число", characters: { bonnie: 2, lily: 2, caroline: 1 } }
        ]
    },
    {
        question: "Твое отношение к человеческим слабостям?",
        options: [
            { text: "Презираю их", characters: { klaus: 2, katherine: 2, damon: 1 } },
            { text: "Завидую им", characters: { stefan: 2, elijah: 2, rebekah: 1 } },
            { text: "Принимаю их", characters: { elena: 2, bonnie: 2, jeremy: 1 } },
            { text: "Использую в своих целях", characters: { enzo: 2, caroline: 2, lily: 1 } }
        ]
    },
    {
        question: "Как ты относишься к технологиям?",
        options: [
            { text: "Не понимаю их", characters: { klaus: 2, elijah: 2, rebekah: 1 } },
            { text: "Осваиваю с трудом", characters: { damon: 2, stefan: 2, katherine: 1 } },
            { text: "Свободно пользуюсь", characters: { elena: 2, jeremy: 2, matt: 1 } },
            { text: "Обожаю технологии", characters: { bonnie: 2, caroline: 2, enzo: 1 } }
        ]
    },
    {
        question: "Твое отношение к музыке?",
        options: [
            { text: "Люблю классику", characters: { elijah: 2, stefan: 2, rebekah: 1 } },
            { text: "Предпочитаю рок", characters: { damon: 2, klaus: 2, enzo: 1 } },
            { text: "Слушаю современную музыку", characters: { elena: 2, jeremy: 2, caroline: 1 } },
            { text: "Не люблю музыку", characters: { katherine: 2, matt: 2, lily: 1 } }
        ]
    },
    {
        question: "Как ты относишься к искусству?",
        options: [
            { text: "Сам создаю искусство", characters: { klaus: 2, jeremy: 2, elena: 1 } },
            { text: "Ценитель искусства", characters: { elijah: 2, stefan: 2, rebekah: 1 } },
            { text: "Равнодушен", characters: { damon: 2, katherine: 2, matt: 1 } },
            { text: "Не понимаю искусство", characters: { bonnie: 2, caroline: 2, enzo: 1 } }
        ]
    },
    {
        question: "Твое отношение к спорту?",
        options: [
            { text: "Занимаюсь для поддержания формы", characters: { stefan: 2, elijah: 2, caroline: 1 } },
            { text: "Не нуждаюсь в спорте", characters: { damon: 2, klaus: 2, katherine: 1 } },
            { text: "Люблю спорт", characters: { matt: 2, jeremy: 2, rebekah: 1 } },
            { text: "Ненавижу спорт", characters: { bonnie: 2, elena: 2, lily: 1 } }
        ]
    },
    {
        question: "Как ты относишься к путешествиям?",
        options: [
            { text: "Обожаю путешествовать", characters: { damon: 2, klaus: 2, katherine: 1 } },
            { text: "Путешествую по необходимости", characters: { stefan: 2, elijah: 2, rebekah: 1 } },
            { text: "Люблю свой город", characters: { elena: 2, jeremy: 2, matt: 1 } },
            { text: "Путешествия утомляют", characters: { bonnie: 2, lily: 2, caroline: 1 } }
        ]
    },
    {
        question: "Твое отношение к животным?",
        options: [
            { text: "Люблю животных", characters: { stefan: 2, elena: 2, jeremy: 1 } },
            { text: "Равнодушен", characters: { damon: 2, elijah: 2, rebekah: 1 } },
            { text: "Боюсь животных", characters: { katherine: 2, bonnie: 2, lily: 1 } },
            { text: "Они - пища", characters: { klaus: 2, enzo: 2, caroline: 1 } }
        ]
    },
    {
        question: "Как ты относишься к детям?",
        options: [
            { text: "Люблю детей", characters: { stefan: 2, elena: 2, jeremy: 1 } },
            { text: "Равнодушен", characters: { damon: 2, elijah: 2, rebekah: 1 } },
            { text: "Не переношу детей", characters: { klaus: 2, katherine: 2, enzo: 1 } },
            { text: "Хочу своих детей", characters: { bonnie: 2, caroline: 2, lily: 1 } }
        ]
    },
    {
        question: "Твое отношение к старению?",
        options: [
            { text: "Боюсь стареть", characters: { elena: 2, jeremy: 2, matt: 1 } },
            { text: "Не думаю об этом", characters: { damon: 2, klaus: 2, katherine: 1 } },
            { text: "Принимаю как часть жизни", characters: { stefan: 2, elijah: 2, rebekah: 1 } },
            { text: "Я бессмертен", characters: { bonnie: 2, lily: 2, caroline: 1 } }
        ]
    },
    {
        question: "Как ты относишься к своим ошибкам?",
        options: [
            { text: "Не признаю ошибок", characters: { damon: 2, klaus: 2, katherine: 1 } },
            { text: "Учусь на ошибках", characters: { stefan: 2, elijah: 2, bonnie: 1 } },
            { text: "Переживаю из-за них", characters: { elena: 2, jeremy: 2, matt: 1 } },
            { text: "Игнорирую", characters: { enzo: 2, rebekah: 2, caroline: 1 } }
        ]
    },
    {
        question: "Твое отношение к человеческим эмоциям?",
        options: [
            { text: "Презираю слабость эмоций", characters: { klaus: 2, katherine: 2, damon: 1 } },
            { text: "Завидую их интенсивности", characters: { stefan: 2, elijah: 2, rebekah: 1 } },
            { text: "Живу эмоциями", characters: { elena: 2, jeremy: 2, matt: 1 } },
            { text: "Контролирую свои эмоции", characters: { bonnie: 2, lily: 2, caroline: 1 } }
        ]
    }
];

// Переменные состояния
let currentQuestionIndex = 0;
let scores = {};
let selectedQuestions = [];
let quizStarted = false;

// DOM элементы
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const resultName = document.getElementById('result-name');
const resultDescription = document.getElementById('result-description');
const resultImage = document.getElementById('result-image');
const shareBtn = document.getElementById('share-btn');
const restartBtn = document.getElementById('restart-btn');

// Инициализация оценок для всех персонажей
function initScores() {
    for (const character in characters) {
        scores[character] = 0;
    }
}

// Выбор случайных вопросов
function selectRandomQuestions() {
    // Создаем копию массива всех вопросов
    const allQuestionsCopy = [...allQuestions];
    selectedQuestions = [];
    
    // Выбираем 7 случайных вопросов
    for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * allQuestionsCopy.length);
        selectedQuestions.push(allQuestionsCopy[randomIndex]);
        allQuestionsCopy.splice(randomIndex, 1);
    }
}

// Загрузка вопроса
function loadQuestion() {
    if (currentQuestionIndex >= selectedQuestions.length) {
        showResult();
        return;
    }

    const question = selectedQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.addEventListener('click', () => selectOption(option));
        optionsContainer.appendChild(button);
    });
    
    // Обновление прогресс-бара
    const progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Выбор варианта ответа
function selectOption(option) {
    // Добавление баллов персонажам
    for (const character in option.characters) {
        scores[character] += option.characters[character];
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// Показать результат
function showResult() {
    // Находим персонажа с максимальным количеством баллов
    let maxScore = -1;
    let resultCharacter = 'damon'; // По умолчанию
    
    for (const character in scores) {
        if (scores[character] > maxScore) {
            maxScore = scores[character];
            resultCharacter = character;
        }
    }
    
    const character = characters[resultCharacter];
    
    resultName.textContent = character.name;
    resultDescription.textContent = character.description;
    resultImage.src = character.image;
    resultImage.alt = character.name;
    
    // Переключение экранов
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
}

// Поделиться результатом
function shareResult() {
    const character = getResultCharacter();
    
    vkBridge.send('VKWebAppShare', {
        link: 'https://vk.com/app123456',
        title: `Я - ${character.name} из "Дневников вампира"!`,
        description: character.description,
        image: character.image
    }).catch(error => {
        console.error('Ошибка при попытке поделиться:', error);
        // Fallback для случаев, когда VK Bridge не работает
        alert('Поделитесь результатом вручную!');
    });
}

// Получить персонажа-результата
function getResultCharacter() {
    let maxScore = -1;
    let resultCharacter = 'damon';
    
    for (const character in scores) {
        if (scores[character] > maxScore) {
            maxScore = scores[character];
            resultCharacter = character;
        }
    }
    
    return characters[resultCharacter];
}

// Начать тест заново
function restartQuiz() {
    currentQuestionIndex = 0;
    initScores();
    selectRandomQuestions();
    
    resultScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    loadQuestion();
}

// Инициализация приложения
function initApp() {
    initScores();
    selectRandomQuestions();
    
    // Начало теста
    startBtn.addEventListener('click', () => {
        startScreen.classList.remove('active');
        quizScreen.classList.add('active');
        loadQuestion();
    });
    
    // Кнопка "Поделиться"
    shareBtn.addEventListener('click', shareResult);
    
    // Кнопка "Пройти снова"
    restartBtn.addEventListener('click', restartQuiz);
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', initApp);