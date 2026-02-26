/* --- DEAD HAND RADIO: REAL INTELLIGENCE DATABASE --- */
const db = [
    // ==========================================
    // AUDIO EPISODES (Podcast Feed)
    // ==========================================
    {
        id: "XXX", 
        title: "DEAD HAND RADIO - FRIDAY THE 13th IT BEGINS", 
        type: "teaser", 
        topics: ["Cold War", "History", "Trailer"], 
        media: "direct", 
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/11043119/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fproduction%2F2020-2-12%2F56232665-48000-2-71c18b2b92aad.mp3"
    },
    {
        id: "000", 
        title: "WHAT IS THE DEAD HAND? - INTRO TO DEAD HAND RADIO", 
        type: "casefile", 
        topics: ["Cold War", "History", "Warfare"], 
        media: "direct", 
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/11134063/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fproduction%2F2020-2-16%2F56781040-48000-2-6b6daf551bf56.mp3"
    },
    {
        id: "001", 
        title: "TIME TRAVEL WITH MARSHALL BARNES - DEAD HAND RADIO 1", 
        type: "casefile", 
        topics: ["Time Travel", "Science", "Existential Threats"], 
        media: "direct", 
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/11084967/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fproduction%2F2020-2-14%2F56491601-48000-2-f5ff0f8920669.mp3"
    },
    {
        id: "SR001", 
        title: "DEAD HAND RADIO - SPECIAL REPORT #1", 
        type: "casefile", 
        topics: ["Community", "Update"], 
        media: "direct", 
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/11201838/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fproduction%2F2020-2-18%2F57174197-48000-2-f4f1f653e8012.mp3"
    },
    {
        id: "002", 
        title: "NBC & WMDs WITH AUTHOR BK BASS - DEAD HAND RADIO 2", 
        type: "casefile", 
        topics: ["Warfare", "Military", "WMDs"], 
        media: "direct", 
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/11319881/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fproduction%2F2020-2-21%2F57832056-48000-2-7924d8ac4acb.mp3"
    },
    {
        id: "003", 
        title: "MOVIES & PODCASTING with PHANTOM DARK DAVE - DEAD HAND RADIO 3", 
        type: "casefile", 
        topics: ["Pop Culture", "Filmmaking", "Horror"], 
        media: "direct", 
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/12001818/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fproduction%2F2020-3-4%2F61735319-48000-2-6171ef3a2855b.mp3"
    },
    {
        id: "004", 
        title: "OUTDOOR ADVENTURES WITH EXPLORATION PROJECT", 
        type: "casefile", 
        topics: ["Exploration", "Photography", "Urbex"], 
        media: "direct", 
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/12210504/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fproduction%2F2020-3-9%2F63046713-48000-2-00ec076614eae.mp3"
    },
    {
        id: "SR002", 
        title: "DEAD HAND RADIO SPECIAL REPORT #2", 
        type: "casefile", 
        topics: ["Community", "Update"], 
        media: "direct", 
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/12375435/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fproduction%2F2020-3-13%2F64209690-48000-2-64808d82d9456.mp3"
    },
    {
        id: "005", 
        title: "POST-APOCALYPTIC MEDIA with EVAN FROM THE WASTES - DEAD HAND RADIO 5", 
        type: "casefile", 
        topics: ["Dystopian", "Literature", "Cold War"], 
        media: "direct", 
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/12955016/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fproduction%2F2020-3-27%2F67925812-48000-2-835fba42e93b3.mp3"
    },
    {
        id: "006", 
        title: "URBEX PHOTOGRAPHY with CINDY VASKO - DEAD HAND RADIO 6", 
        type: "casefile", 
        topics: ["Urbex", "Photography", "Abandoned Buildings"], 
        media: "direct", 
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/14243031/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fproduction%2F2020-4-25%2F76346094-48000-2-7f58cd304b989.mp3"
    },
    {
        id: "007",
        title: "CREATIVE INFLUENCES with ARTIST J. EDWARD NEILL - DEAD HAND RADIO 7",
        type: "casefile",
        topics: ["Art", "Philosophy", "Creativity"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/14974647/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fproduction%2F2020-5-10%2F80977071-48000-2-8d24b600643c5.mp3"
    },
    {
        id: "008",
        title: "UFOs and UAP in the UK - UFO EDITION 01",
        type: "casefile",
        topics: ["UFOs", "UAP", "UK"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/15622381/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fproduction%2F2020-5-24%2F84797241-48000-2-e8af6c8d3cc01.mp3"
    },
    {
        id: "009",
        title: "UFO INVESTIGATOR SHANE HURD - UFO EDITION 02",
        type: "casefile",
        topics: ["UFOs", "MUFON", "Investigation"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/16385369/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-6-10%2F3e271c44-c3ab-08df-f765-4c07625e3e4d.mp3"
    },
    {
        id: "010",
        title: "TRINITY TEST with NATIONAL ATOMIC TESTING MUSEUM - DEAD HAND RADIO 10",
        type: "casefile",
        topics: ["Atomic History", "Nevada Test Site", "Manhattan Project"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/16665540/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-6-16%2F7fb6b875-e9d5-386e-8fa0-ff003c5925fc.mp3"
    },
    {
        id: "011",
        title: "HIROSHIMA & NAGASAKI with ATOMICARCHIVE.COM - DEAD HAND RADIO 11",
        type: "casefile",
        topics: ["Atomic History", "WWII", "Japan"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/17521621/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-7-4%2F4fe4574f-fc2c-22e9-2e41-c035f80370f7.mp3"
    },
    {
        id: "012",
        title: "NUMBERS STATIONS - DHR 012",
        type: "casefile",
        topics: ["Espionage", "Shortwave Radio", "Cold War Tech"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/17845328/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-4-21%2F400725525-44100-2-e26dc523fd5ef.m4a"
    },
    {
        id: "013",
        title: "COLD WAR, SPACE PROGRAM AND UFOs - UFO EDITION 03",
        type: "casefile",
        topics: ["Space Program", "UFOs", "Cold War"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/18337375/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-7-20%2F8556002d-1a92-8a89-b362-d4cdc3852761.mp3"
    },
    {
        id: "014",
        title: "COLD WAR MOVIES - DEAD HAND RADIO 14",
        type: "casefile",
        topics: ["Film", "Pop Culture", "WWIII Movies"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/19348567/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-8-9%2Fc5a9649f-376f-b41f-9c8b-d692a25823e8.mp3"
    },
    {
        id: "015",
        title: "UFOs AND NUKES WITH JEREMY McGOWAN - UFO EDITION 04",
        type: "casefile",
        topics: ["UFOs", "Nuclear Weapons", "Military"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/19967493/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-8-21%2Fa24ab19c-de6f-0201-9558-bae340697fdd.mp3"
    },
    {
        id: "016",
        title: "COLD WAR AUSTRALIA - DEAD HAND RADIO 16",
        type: "casefile",
        topics: ["Australia", "History", "Berlin Wall"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/20374440/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-8-29%2F866da531-c476-02d3-90ca-d2b77104f80c.mp3"
    },
    {
        id: "017",
        title: "FILMMAKING & THE APOCALYPSE WITH FILM MAKER DAVID LIBAN DEAD HAND RADIO 17",
        type: "casefile",
        topics: ["Filmmaking", "Post-Apocalyptic", "Cinema"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/20763684/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-7%2Fbd63c79e-f6be-65fa-e89c-8597be8da92a.mp3"
    },
    {
        id: "018",
        title: "COLD WAR 2.0 & THE APOCALYPSE WITH JJ SHURTE",
        type: "casefile",
        topics: ["Current Events", "Asia", "Geopolitics"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/21181303/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-16%2F118887610-44100-2-f6797e4f2ec43.m4a"
    },
    {
        id: "019",
        title: "QUANTUM CONSCIOUSNESS WITH SCI-FI WRITER ARTHUR H. WALKER DEAD HAND RADIO 19",
        type: "casefile",
        topics: ["Quantum Computing", "AI", "Consciousness"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/21445450/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-21%2F8ee75503-f28b-7cd9-1a44-685b3bd3da3f.mp3"
    },
    {
        id: "020",
        title: "GHOSTS UFOs & AN AXE MURDERER with PODCASTER JAMIE RAY",
        type: "casefile",
        topics: ["Ghosts", "UFOs", "True Crime"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/21667359/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-26%2Fe718ace4-b7c2-7918-c002-dcafe9aa53a9.mp3"
    },
    {
        id: "021",
        title: "GHOSTS & ZOMBIES IN LAS VEGAS",
        type: "casefile",
        topics: ["Hauntings", "Zombies", "Las Vegas"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/21668756/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-26%2F2c3cfeaa-7c2e-896d-ed01-44f8a063781d.mp3"
    },
    {
        id: "022",
        title: "ASYLUMS & PRISONS OF W. VIRGINIA",
        type: "casefile",
        topics: ["Urban Exploration", "Haunted History", "West Virginia"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/21671811/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-26%2F8d9dca64-b674-ce68-b7a3-910d0d9599e9.mp3"
    },
    {
        id: "023",
        title: "LEGENDS MYTHS & SOMETHING ELSE",
        type: "casefile",
        topics: ["Myths", "Legends", "Paranormal"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/21673040/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-26%2F159085a8-4d28-6c3d-a493-6d944cb95ae2.mp3"
    },
    {
        id: "024",
        title: "CURSE OF THE TITANIC",
        type: "casefile",
        topics: ["History", "Titanic", "Maritime Mysteries"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/21729840/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-27%2F35bbf72a-d492-6f86-eb64-15aacfdb1e94.mp3"
    },
    {
        id: "025",
        title: "A GRAVEYARD STORY & THE GHOST OF ABE LINCOLN",
        type: "casefile",
        topics: ["Ghosts", "History", "Paranormal"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/21730553/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-27%2Fbdbb6942-c79f-1443-4343-8f0ae5450e5c.mp3"
    },
    {
        id: "026",
        title: "LEGENDS LORE & MORE with EXPLORATION PROJECT",
        type: "casefile",
        topics: ["Folklore", "Legends", "Paranormal"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/21776489/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-28%2Fe1984a6a-c197-9897-7b1b-701fc86fbf2b.mp3"
    },
    {
        id: "027",
        title: "HAUNTED LAS VEGAS with AUTHOR PAUL W. PAPA",
        type: "casefile",
        topics: ["Hauntings", "Las Vegas", "Ghost Stories"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/21781527/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-28%2Fac00a8a2-379d-b457-5feb-d91960eb42b1.mp3"
    },
    {
        id: "028",
        title: "PARTING THE VEIL by B.K. BASS",
        type: "casefile",
        topics: ["Literature", "Paranormal", "Thriller"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/21883694/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-30%2Fc3eabaf1-6bb1-631c-48d1-a7afdc484595.mp3"
    },
    {
        id: "029",
        title: "ENCOUNTER WITH EVIL WITH PSYCHIC SANDIE LANAE",
        type: "casefile",
        topics: ["Psychic", "Remote Viewing", "Demonology"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/21883247/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-30%2F669a3628-17c5-7c48-20c7-332d08521623.mp3"
    },
    {
        id: "030",
        title: "SKINWALKER RANCH & A GHOST STORY - JEREMY McGOWAN",
        type: "casefile",
        topics: ["Skinwalker Ranch", "UFOs", "Paranormal"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/21884257/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-30%2F97e06c32-87cc-94c0-2ffa-69dcd3a56836.mp3"
    },
    {
        id: "031",
        title: "NORSE MYTHOLOGY & A CHILLING TALE - HANSON OAK",
        type: "casefile",
        topics: ["Mythology", "Norse", "Storytelling"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/21918485/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-31%2Fa3d5f6d7-3735-9ce5-85dc-756af48de576.mp3"
    },
    {
        id: "032",
        title: "PODCASTING & SCIENCE FICTION BEN BULMAN ANGRY DAD PODCAST",
        type: "casefile",
        topics: ["Podcasting", "Science Fiction", "Business"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/22364440/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-10-10%2F8da3d3e9-838f-4f9e-0543-72502a36b244.mp3"
    },
    {
        id: "033",
        title: "MORTAL ENGINES & THE RAILHEAD by PHILIP REEVE",
        type: "casefile",
        topics: ["Literature", "Worldbuilding", "Sci-Fi"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/22503070/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-10-12%2Fcf8a6788-7a3d-478d-3ccf-65ddb28ead99.mp3"
    },
    {
        id: "034",
        title: "WRITING SCI-FI & HISTORICAL FICTION AUTHOR J. CLIFTON SLATER",
        type: "casefile",
        topics: ["Historical Fiction", "Vietnam Veteran", "Writing"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/22622667/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-10-15%2F50f43d0a-b846-abb9-df16-b6e8db44f67a.mp3"
    },
    {
        id: "035",
        title: "MECHS AND THE MULTIVERSE JOHN BEAR ROSS",
        type: "casefile",
        topics: ["Mechs", "Multiverse", "Cold War Influence"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/22625911/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-10-15%2F255092f4-5dcc-c2cb-ea4f-2980db74f0a0.mp3"
    },
    {
        id: "036",
        title: "REALITY vs FICTION and THE WORLD OF THE WEIRD JASON McCLELLAN",
        type: "casefile",
        topics: ["UFOs", "Journalism", "Sci-Fi vs Reality"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/22943358/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-10-22%2F868ad47f-271a-4253-7263-26d885d625f3.mp3"
    },
    {
        id: "037",
        title: "SCIFI HORROR & ALTERNATE REALITIES - HERE ON MARS",
        type: "casefile",
        topics: ["Warhammer 40k", "Music", "Horror"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/23233066/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-10-28%2F641ec05b-e37f-d844-38e5-77df5ffc78b3.mp3"
    },
    {
        id: "038",
        title: "UFO CRASHES & GOV COVERUPS PRESTON DENNETT",
        type: "casefile",
        topics: ["UFO Crashes", "Coverups", "Kingman AZ"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/23366171/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-11-1%2F2dd1d2c5-7fb4-0b27-cb48-784251b2fa21.mp3"
    },
    {
        id: "039",
        title: "Alien Abductions, MILABs & UFO Disclosure: Melinda Leslie",
        type: "casefile",
        topics: ["Abductions", "MILABs", "Disclosure"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/23534961/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-11-5%2F12340f55-0902-53dc-dcb9-38174e99b52b.mp3"
    },
    {
        id: "040",
        title: "EYEWITNESS ACCOUNT MULTIPLE UFO SIGHTINGS",
        type: "casefile",
        topics: ["UAP", "Military Witness", "Disclosure"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/23643104/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-11-7%2F76f38cba-f47a-80d1-2de7-10889c3f6125.mp3"
    },
    {
        id: "041",
        title: "SCIENCE UFOs & THE PARANORMAL",
        type: "casefile",
        topics: ["Scientific Method", "UAP Studies", "Cold War Memories"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/23806891/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-11-10%2F85047aea-44b1-25a9-0f06-4d1a2225325e.mp3"
    },
    {
        id: "042",
        title: "SCIFI THE COLD WAR & UFOs with AUTHOR JD KELLNER",
        type: "casefile",
        topics: ["Sci-Fi", "Fantasy", "Cold War"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/23898995/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-11-13%2F163150c9-52cd-ab05-7017-d0bbb31a8acf.mp3"
    },
    {
        id: "043",
        title: "ON AIR WITH UFOS AND THE PARANORMAL",
        type: "casefile",
        topics: ["Broadcasting", "Sasquatch", "Psychic Abilities"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/24069981/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-11-16%2F32e3a69f-318b-fcc0-e051-f88ec8ba542d.mp3"
    },
    {
        id: "044",
        title: "TALKING WITH THE EDITOR of APEX MAGAZINE",
        type: "casefile",
        topics: ["Publishing", "Literature", "Independent Press"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/24274222/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-11-21%2F664f9f50-f6e7-a595-ab44-e298a836220d.mp3"
    },
    {
        id: "045",
        title: "COMIC ART SCIFI AND THE COLD WAR",
        type: "casefile",
        topics: ["Comic Art", "Illustration", "Sci-Fi"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/24354905/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-11-23%2Fe4c9ae0e-a0b4-155f-0463-8b07ae2b7390.mp3"
    },
    {
        id: "046",
        title: "AN ABDUCTION, TIME TRAVEL AND A TRIP TO THE MOON",
        type: "casefile",
        topics: ["Abduction", "Time Travel", "Moon"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/24943648/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-0-9%2F8faab669-548d-09ca-d85a-8610ee90d469.mp3"
    },
    {
        id: "047",
        title: "IN PURSUIT OF UAP – DOCUMENTING THE PHENOMENA",
        type: "casefile",
        topics: ["UAP", "Documentary", "Technology"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/25345077/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-0-18%2F18ff1e61-d6e6-064b-c4fe-9c0c95fab22b.mp3"
    },
    {
        id: "048",
        title: "SCIENCE FICTION & HORROR REVIEWS",
        type: "casefile",
        topics: ["Reviews", "Literature", "Horror"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/25421438/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-0-19%2Fc096ea98-ee50-422a-8671-189fd09e6fbf.mp3"
    },
    {
        id: "049",
        title: "WRITING & PUBLISHING SCIENCE FICTION",
        type: "casefile",
        topics: ["Writing", "Publishing", "Sci-Fi"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/25439080/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-0-19%2F847f7048-5b9b-017d-4857-79969ea66584.mp3"
    },
    {
        id: "050",
        title: "SKY FISHING TO PHOTOGRAPH UFOs",
        type: "casefile",
        topics: ["Photography", "UFOs", "Sky Fishing"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/25652573/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-0-24%2Fd612a989-b527-3132-d687-024d9ee580c5.mp3"
    },
    {
        id: "051",
        title: "TALKING SCIFI WITH THE PHANTOM",
        type: "casefile",
        topics: ["Sci-Fi", "Cinema", "TV"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/25776094/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-0-27%2F2b30ca57-142b-52e5-2a36-5736dc0c20bc.mp3"
    },
    {
        id: "052",
        title: "MUSIC THE COLD WAR UFOs AND SKINWALKER RANCH",
        type: "casefile",
        topics: ["Music", "UFOs", "Skinwalker Ranch"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/25972351/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-0-30%2F43176aa7-afd2-eff7-4173-5dcb944c8752.mp3"
    },
    {
        id: "053",
        title: "GHOSTS DEMONS AND GANGSTERS",
        type: "casefile",
        topics: ["Ghosts", "Demons", "Las Vegas"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/26056680/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-1%2F6ee4372d-1769-aad5-4c2b-7f21f7c125dc.mp3"
    },
    {
        id: "054",
        title: "DHR 054 – Godzilla vs. Kong: Who Would Win?",
        type: "casefile",
        topics: ["Pop Culture", "Kaiju", "Speculation"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/105941200/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-6-24%2F3b810991-025b-bdfa-e472-364dd201ae60.m4a"
    },
    {
        id: "055",
        title: "DHR 055: Alien Contact, Underground Bases & the Global Hum - Russell Pickering",
        type: "casefile",
        topics: ["Remote Viewing", "Underground Bases", "Global Hum"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/105941421/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-6-24%2F694d85cc-5dc4-c16b-021b-c9c29deaed6c.m4a"
    },
    {
        id: "056",
        title: "UFOs THE COLD WAR & CONSCIOUSNESS",
        type: "casefile",
        topics: ["Consciousness", "Disclosure", "Government Documents"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/26480129/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-10%2Fe090f99d-e12d-7020-03fe-721d516f6026.mp3"
    },
    {
        id: "057",
        title: "DHR 057 – Spiritual Warfare With Real-Life Exorcist: Rev. Shawn Whittington",
        type: "casefile",
        topics: ["Exorcism", "Spiritual Warfare", "Demonology"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/105943212/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-6-24%2F404479658-44100-2-953920ab9ac9c.m4a"
    },
    {
        id: "058",
        title: "DHR 058 - Hollow Moon Theory, UFOs & Apollo Secrets – Constance Victoria Briggs",
        type: "casefile",
        topics: ["Moon Mysteries", "Apollo Missions", "Astronauts"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/105958432/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-6-25%2Fac7ae70c-31f3-9281-5128-a196743b20dd.mp3"
    },
    {
        id: "059",
        title: "UFO DINSINFO & THE COUNTERINTEL ANGLE",
        type: "casefile",
        topics: ["Counterintelligence", "MJ-12", "Disinformation"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/26951311/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-19%2F4736524a-da54-a11c-f7e3-2d444d90391d.mp3"
    },
    {
        id: "060",
        title: "SCIENTIFIC COALITION FOR UAP STUDIES - ROBERT POWELL",
        type: "casefile",
        topics: ["UAP Studies", "Science", "FOIA"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/27767724/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-2-3%2F240f8249-3249-caaf-3589-7a269242c828.mp3"
    },
    {
        id: "061",
        title: "TED PHILLIPS, UFOs & MARLEY WOODS - UFO INVESTIGATOR THOMAS FERRARIO",
        type: "casefile",
        topics: ["Marley Woods", "UFO Activity", "Field Research"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/28608275/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-2-10%2F56f924f8-b1db-0628-088b-2c1156a5beb3.mp3"
    },
    {
        id: "062",
        title: "Investigating the Phenomena: Cold War Secrets, Contact, and the Hidden War for Truth",
        type: "casefile",
        topics: ["Contact", "DARPA", "Cold War Secrets"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/29621830/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-4-20%2F400650681-44100-2-887fc68ecdd94.m4a"
    },
    {
        id: "063",
        title: "THIS AMERICAN WASTELAND - A SCIFI AUDIO DRAMA",
        type: "casefile",
        topics: ["Audio Drama", "Sci-Fi", "Wasteland"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/30520077/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-3-1%2F55a3c905-5265-89a3-ef8b-9227b5e41732.mp3"
    },
    // ==========================================
    // VIDEO EPISODES (YouTube Feed)
    // ==========================================
    {
        id: "064",
        title: "DHR 055: Underground Bases - Russell Pickering",
        type: "casefile",
        topics: ["Remote Viewing", "Underground Bases", "Project 8200"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=TtAgrTse33s"
    },
    {
        id: "065",
        title: "DHR 057 – SPIRITUAL WARFARE WITH REAL-LIFE EXORCIST: REV. SHAWN WHITTINGTON",
        type: "casefile",
        topics: ["Spiritual Warfare", "Exorcism", "Las Vegas"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=DmueERbmhi0"
    },
    {
        id: "066",
        title: "DHR 058 - Hollow Moon Theory, UFOs & Apollo Secrets – Constance Victoria Briggs",
        type: "casefile",
        topics: ["Hollow Moon", "Apollo", "Lunar Mysteries"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=vJQBuhLUGRQ"
    },
    {
        id: "067",
        title: "UFO Crashes and Landings with UFO Researcher Preston Dennett",
        type: "casefile",
        topics: ["UFO Crashes", "Landings", "Preston Dennett"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=yESXMPx_bdc"
    },
    {
        id: "068",
        title: "Haunted Las Vegas with Author Paul W Papa",
        type: "casefile",
        topics: ["Haunted Las Vegas", "Ghost Stories", "Paul W Papa"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=k4e7VD1QDTU"
    },
    {
        id: "069",
        title: "UFOs vs The US Government with Arizona MUFON Assistant State Director Shane Hurd",
        type: "casefile",
        topics: ["MUFON", "Government", "Shane Hurd"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=7OGBp4NcPv4"
    },
    {
        id: "070",
        title: "Investigating UFOs and the Paranormal with Private Investigator Ryan Stacey",
        type: "casefile",
        topics: ["Ryan Stacey", "Investigation", "TESA"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=iidfRQijUCE"
    },
    {
        id: "071",
        title: "Remote Viewing Mars, the Moon, and Alien Bases with Daz Smith",
        type: "casefile",
        topics: ["Remote Viewing", "Mars", "Daz Smith"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=oLjqqkdcOtk"
    },
    {
        id: "072",
        title: "UFO Activism with Luis Jimenez - Host of The Unidentified Celebrity Review",
        type: "casefile",
        topics: ["Activism", "Luis Jimenez", "Disclosure"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=DcwK6AothSA"
    },
    {
        id: "073",
        title: "UFOs / Podcasting and the Paranormal with Podcaster Dave Logan",
        type: "casefile",
        topics: ["Podcasting", "Dave Logan", "UAPTF"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=-_MW491Ugfc"
    },
    {
        id: "074",
        title: "The Legacy of Ted Phillips: Marley Woods with Thomas Ferrario",
        type: "casefile",
        topics: ["Marley Woods", "Ted Phillips", "Thomas Ferrario"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=S7C2X7mENCA"
    },
    {
        id: "075",
        title: "UFO History, Sightings and Disclosure with UFO Researcher The Undead Gaucho",
        type: "casefile",
        topics: ["UFO History", "Undead Gaucho", "Disclosure"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=NEXDZ3cJq-I"
    },
    {
        id: "076",
        title: "UFO Disinfo Before MJ-12 with UFO Investigator Thomas Whitmore",
        type: "casefile",
        topics: ["Disinfo", "MJ-12", "Thomas Whitmore"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=8pOkQmuDmQQ"
    },
    {
        id: "077",
        title: "Time Travel & Parallel Universes with Marshall Barnes",
        type: "casefile",
        topics: ["Time Travel", "Parallel Universes", "Marshall Barnes"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=QuyBLujA8K8"
    },
    {
        id: "078",
        title: "High Speed UFOs and the Investigative Team That Wrote the Book",
        type: "casefile",
        topics: ["Fast Movers", "Investigation", "Margie Kay"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=aKKkgZO1sdo"
    },
    {
        id: "079",
        title: "UFOs / The Cold War & SciFi",
        type: "casefile",
        topics: ["Cold War", "Sci-Fi", "JD Kellner"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=rQnwCjQcL1A"
    },
    {
        id: "080",
        title: "UFOS / REMOTE VIEWING & PSYCHIC SENSES",
        type: "casefile",
        topics: ["Remote Viewing", "Psychic Senses", "Margie Kay"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=zQh2tEWnFPo"
    },
    {
        id: "081",
        title: "UFO Photography Pt 2 - Misidentifications & Hoaxes vs Authentic UFO Photos",
        type: "casefile",
        topics: ["UFO Photography", "Hoaxes", "Scott Browne"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=_Es1fuzNmGE"
    },
    {
        id: "082",
        title: "The Cold War & Soviet Era Military Hardware",
        type: "casefile",
        topics: ["Cold War", "Soviet Hardware", "Graeme Rendall"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=TwhFF10a0j4"
    },
    {
        id: "083",
        title: "Movies, The Cold War and A Bridge of Spies",
        type: "casefile",
        topics: ["Cinema", "Bridge of Spies", "Roc Su"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=xL1HQGEI3Nc"
    },
    {
        id: "084",
        title: "State of the UFO Disclosure Movement with Jeremy McGowan",
        type: "casefile",
        topics: ["Disclosure", "Jeremy McGowan", "UAP"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=TvasdZLZojg"
    },
    {
        id: "085",
        title: "Exploring the Other Side of Reality",
        type: "casefile",
        topics: ["Paranormal", "Night Terror Collective", "Jason Walker"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=huc2LYPC6OE"
    },
    {
        id: "086",
        title: "Strange Encounters: UFO Crashes and Mysteries with Jeremy Meador",
        type: "casefile",
        topics: ["UFO Crashes", "Nevada", "Jeremy Meador"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=kBB3oQrD9xc"
    },
    {
        id: "087",
        title: "Walking the Shadowlands with Host Marianne Coleman",
        type: "casefile",
        topics: ["Shadowlands", "Marianne Coleman", "New Zealand"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=7n58Rr5DzI8"
    },
    {
        id: "088",
        title: "Fave Five Sci-Fi Planets with Podcaster Jamie Ray",
        type: "casefile",
        topics: ["Sci-Fi", "Jamie Ray", "Planets"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=fPqkujEXIPs"
    },
    {
        id: "089",
        title: "UFOs & UAPs in Canada with VICE NEWS Writer Daniel Otis",
        type: "casefile",
        topics: ["Canada", "Vice News", "Daniel Otis"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=YcJDvQ6NnV0"
    },
    {
        id: "090",
        title: "Consciousness & Conservation with #1 Best Selling Author Wajid Hassan",
        type: "casefile",
        topics: ["Consciousness", "Conservation", "Wajid Hassan"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=_U3chPK6jzo"
    },
    {
        id: "091",
        title: "UFOs, Psyops & Government Disinfo | Exposing the Hidden Agenda w/ Tom Whitmore",
        type: "casefile",
        topics: ["Psyops", "Disinfo", "Tom Whitmore"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=X3OKIXdDrFg"
    },
    {
        id: "092",
        title: "UFOs Nukes & Tensions in Asia with SciFi Author JJ Shurte",
        type: "casefile",
        topics: ["Nukes", "Asia", "JJ Shurte"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=HaxzlcUL9XY"
    },
    {
        id: "093",
        title: "The Cold War UFOs and Nukes with Journalist Jazz Shaw",
        type: "casefile",
        topics: ["Cold War", "Nukes", "Jazz Shaw"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=ato1AcrhwSw"
    },
    {
        id: "094",
        title: "UFOs Near Deserts and Bodies of Water with UFO Researcher Preston Dennett",
        type: "casefile",
        topics: ["Water UFOs", "USOs", "Preston Dennett"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=D7nlkApRsMo"
    },
    {
        id: "095",
        title: "McCarthyism and The Red Scare with Author Matthew Kresal",
        type: "casefile",
        topics: ["McCarthyism", "Red Scare", "Matthew Kresal"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=XyVMW6x1zEA"
    },
    {
        id: "096",
        title: "UFOs / Factions and Hidden Agendas with UFO Researcher Thomas Whitmore",
        type: "casefile",
        topics: ["Factions", "Hidden Agendas", "Thomas Whitmore"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=UktMbMKNQF0"
    },
    {
        id: "097",
        title: "Stories from the Apocalypse with Author E.T. Gunnarsson",
        type: "casefile",
        topics: ["Apocalypse", "Literature", "ET Gunnarsson"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=tBg3_8tHBYc"
    },
    {
        id: "098",
        title: "Nukes Fallout and the Aftermath with Physics Teacher Richard \"Dickie\" Howe",
        type: "casefile",
        topics: ["Fallout", "Nukes", "Richard Howe"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=A2IRqLIQmqk"
    },
    {
        id: "099",
        title: "Hidden UFO Bases on Earth? with UFO Researcher Preston Dennett",
        type: "casefile",
        topics: ["UFO Bases", "Underground", "Preston Dennett"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=AGfh86-l2ro"
    },
    {
        id: "100",
        title: "UFO Activity Captured on Video? With UFO Filmmaker Patricia Avant",
        type: "casefile",
        topics: ["UFO Video", "Filmmaking", "Patricia Avant"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=tY9PxmnEIlI"
    },
    {
        id: "101",
        title: "The Secret World of Remote Viewing with Daz Smith",
        type: "casefile",
        topics: ["Remote Viewing", "CIA", "Daz Smith"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=WzOKDDEyMeQ"
    },
    {
        id: "102",
        title: "Bigfoot, Ghost Hunting and UFOs",
        type: "casefile",
        topics: ["Bigfoot", "Ghost Hunting", "Bigfoot's Pad"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=s4gSgez0bs0"
    },
    {
        id: "103",
        title: "Music Noir Fiction and Life in Ireland with Author Simon Maltman",
        type: "casefile",
        topics: ["Noir", "Ireland", "Simon Maltman"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=IRkzF0cAxxw"
    },
    {
        id: "104",
        title: "SciFi vs The Real Paranormal with SciFi Author R.S. Penney",
        type: "casefile",
        topics: ["Sci-Fi", "Paranormal", "RS Penney"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=gF38fSim9IY"
    },
    {
        id: "105",
        title: "Historical UFO Cases and the UAPTF Report",
        type: "casefile",
        topics: ["UFO History", "UAPTF", "Michael Schratt"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=d6JIpQuEftg"
    },
    {
        id: "106",
        title: "UFOs and Nukes The Real Threat",
        type: "casefile",
        topics: ["Nukes", "UFO Threat", "Roundtable"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=vjhEvxYjd1g"
    },
    {
        id: "107",
        title: "The History of Remote Viewing",
        type: "casefile",
        topics: ["Remote Viewing", "History", "Russell Pickering"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=JQsp6K_LFNA"
    },
    {
        id: "108",
        title: "UFOs - Who / What is Driving Them?",
        type: "casefile",
        topics: ["UFO Origins", "Preston Dennett", "Theories"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=teVtnRcV_wY"
    },
    {
        id: "109",
        title: "UFOs / Science & The Cold War",
        type: "casefile",
        topics: ["Science", "Cold War", "Chris Plain"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=d-5_METAvbQ"
    },
    {
        id: "110",
        title: "Remote Viewing Roswell & UFOs",
        type: "casefile",
        topics: ["Roswell", "Remote Viewing", "Daz Smith"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=3wwq3F0TRGU"
    },
    {
        id: "111",
        title: "UFO Photography Real vs Hoaxed",
        type: "casefile",
        topics: ["UFO Photography", "Hoaxes", "Scott Browne"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=BpssYv3saMY"
    },
    {
        id: "112",
        title: "Foo Fighters - UFOs Over Europe",
        type: "casefile",
        topics: ["Foo Fighters", "WWII", "Graeme Rendall"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=puNdtk-w_gE"
    },
    {
        id: "113",
        title: "UFO Wars and The Aftermath",
        type: "casefile",
        topics: ["UFO Wars", "Future", "ST Campitelli"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=8W4zj646r9M"
    },
    {
        id: "114",
        title: "MKULTRA & Mind Control",
        type: "casefile",
        topics: ["MKULTRA", "Mind Control", "Tom Whitmore"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=3BES_Lk6bJQ"
    },
    {
        id: "111",
        title: "Alternate Reality Games (ARGs) with Rustin L. Odom",
        type: "casefile",
        topics: ["ARG", "Multimedia", "Rustin Odom"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=UYT6rT_WpvA"
    },
    {
        id: "112",
        title: "The Lost Civilization of Atlantis with David Edward",
        type: "casefile",
        topics: ["Atlantis", "Archaeology", "David Edward"],
        media: "video",
        audio_url: "https://www.youtube.com/watch?v=iJAAsEWH_P8"
    },
        {
        id: "111",
        title: "Alternate Reality Games (ARGs) with Rustin L Odom",
        type: "casefile",
        topics: ["ARG", "Multimedia", "Storytelling"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/60330048/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2022-10-9%2F295868969-44100-2-915753fec36ae.m4a"
    },
    {
        id: "112",
        title: "The Lost Civilization of Atlantis",
        type: "casefile",
        topics: ["Atlantis", "History", "Archaeology"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/62527106/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2022-11-21%2F304298471-44100-2-3a6fef828dad9.m4a"
    },
    {
        id: "201",
        title: "Inside Bermuda’s Cold War Legacy – A Conversation with Author Bob Richards",
        type: "casefile",
        topics: ["Bermuda", "Cold War", "Finance"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/102903857/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-4-20%2F400608448-44100-2-fc934e7608065.m4a"
    },
    {
        id: "202",
        title: "Inside the Mind of a Tank Officer and Entrepreneur – Jeremy S. Bailey",
        type: "casefile",
        topics: ["Military Service", "Entrepreneurship", "Leadership"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/105015643/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-6-4%2F403292217-44100-2-3953b2df5d6ee.m4a"
    },
    {
        id: "203",
        title: "AI Warfare & Unexplained Encounters - Jeremy S. Bailey Pt 2",
        type: "casefile",
        topics: ["AI", "Warfare", "Ethics"],
        media: "direct",
        audio_url: "https://anchor.fm/s/148a5728/podcast/play/105555518/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-6-15%2F42ec145c-d3d0-5a0b-922c-b201755fa463.mp3"
    }
];