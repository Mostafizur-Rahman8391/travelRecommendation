async function handleSearch() {
  const search_input = document.getElementById('search-bar').value
  const url = './travel_recommendation_api.json'
  const resultsContainer = document.getElementById('results-container')

  resultsContainer.innerHTML = ''

  const data = await fetch(url).then((response) => {
    return response.json()
  })

  let exit = false

  if (search_input.trim() === '') {
    return
  }

  Object.keys(data).forEach((key) => {
    {
      if (search_input.toLowerCase().match(/\b(country|countries)\b/)) {
        if (key.toLowerCase().match('countries')) {
          data[key].forEach((country) => {
            country.cities.forEach((city) => {
              addItemList(city.imageUrl, city.name, city.description)
              const firstWord = city.name.split(',')[0].trim().split(' ')[0]
              addTime(country.name, firstWord.toLowerCase())
              exit = true
            })
          })
        }
      } else if (search_input.toLowerCase().match(/\b(temple|temples)\b/)) {
        if (key.toLowerCase().match('temples')) {
          data[key].forEach((temple) => {
            addItemList(temple.imageUrl, temple.name, temple.description)
            exit = true
          })
        }
      } else if (search_input.toLowerCase().match(/\b(beach|beaches)\b/)) {
        if (key.toLowerCase().match('beaches')) {
          data[key].forEach((beach) => {
            addItemList(beach.imageUrl, beach.name, beach.description)
            exit = true
          })
        }
      }
    }
  })

  if (exit) return

  data.countries.forEach((country) => {
    if (country.name.toLowerCase().includes(search_input.toLowerCase())) {
      country.cities.forEach((city) => {
        addItemList(city.imageUrl, city.name, city.description)
        const firstWord = city.name.split(',')[0].trim().split(' ')[0]
        addTime(country.name, firstWord.toLowerCase())
        exit = true
      })
    }
  })
  if (exit) return

  data.countries.forEach((country) => {
    country.cities.forEach((city) => {
      if (city.name.toLowerCase().includes(search_input.toLowerCase())) {
        addItemList(city.imageUrl, city.name, city.description)
        const firstWord = city.name.split(',')[0].trim().split(' ')[0]
        addTime(country.name, firstWord.toLowerCase())
        exit = true
      }
    })
  })
  if (exit) return

  data.temples.forEach((temple) => {
    if (temple.name.toLowerCase().includes(search_input.toLowerCase())) {
      addItemList(temple.imageUrl, temple.name, temple.description)
      exit = true
    }
  })
  if (exit) return

  data.beaches.forEach((beach) => {
    if (beach.name.toLowerCase().includes(search_input.toLowerCase())) {
      addItemList(beach.imageUrl, beach.name, beach.description)
      exit = true
    }
  })
  if (exit) return
}

function addItemList(imgUrl, name, description) {
  const resultsContainer = document.getElementById('results-container')

  const resultItem = document.createElement('div')
  resultItem.classList.add('result-item')

  const img = document.createElement('img')
  img.src = imgUrl
  img.classList.add('result-img')
  resultItem.appendChild(img)

  const resultInfo = document.createElement('div')
  resultInfo.classList.add('result-info')

  const firstWord = name.toLowerCase().split(',')[0].trim().split(' ')[0]
  resultInfo.classList.add(`${firstWord}`)

  const h3 = document.createElement('h3')
  h3.textContent = name
  resultInfo.appendChild(h3)

  const p = document.createElement('p')
  p.textContent = description
  resultInfo.appendChild(p)

  const button = document.createElement('button')
  button.classList.add('visit-btn')
  button.textContent = 'visit'
  resultInfo.appendChild(button)

  resultItem.appendChild(resultInfo)

  resultsContainer.appendChild(resultItem)
}

const btnSearch = document.getElementById('search-btn')
btnSearch.onclick = handleSearch

function handleClear() {
  const resultsContainer = document.getElementById('results-container')
  const search_input = document.getElementById('search-bar')

  search_input.value = ''
  resultsContainer.innerHTML = ''
}

const btnClear = document.getElementById('clear-btn')
btnClear.onclick = handleClear

const timezoneMap = {
  sydney: 'Australia/Sydney',
  tokyo: 'Asia/Tokyo',
  melbourne: 'Australia/Melbourne',
  kyoto: 'Asia/Tokyo',
  rio: 'America/Sao_Paulo',
  são: 'America/Sao_Paulo',
}

function addTime(country, city) {
  console.log(city)
  const resultsContainer = document.querySelector(`.${city}`)
  console.log(resultsContainer)

  const timezone = timezoneMap[city]
  console.log(timezone)
  const options = {
    timeZone: timezone,
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  const time = new Date().toLocaleTimeString('en-US', options)
  console.log(time)
  const p = document.createElement('p')
  p.textContent = time

  resultsContainer.appendChild(p)
}
