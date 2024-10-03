async function handleSearch() {
  const search_input = document.getElementById('search-bar').value
  const url =
    'https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json'

  const data = await fetch(url).then((response) => {
    return response.json()
  })

  let exit = false

  Object.keys(data).forEach((key) => {
    {
      if (search_input.toLowerCase().match(/\b(country|countries)\b/)) {
        if (key.toLowerCase().match('countries')) {
          data[key].forEach((country) => {
            country.cities.forEach((city) => {
              addItemList(city.imageUrl, city.name, city.description)
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
        exit = true
      })
    }
  })
  if (exit) return

  data.countries.forEach((country) => {
    country.cities.forEach((city) => {
      if (city.name.toLowerCase().includes(search_input.toLowerCase())) {
        addItemList(city.imageUrl, city.name, city.description)
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
