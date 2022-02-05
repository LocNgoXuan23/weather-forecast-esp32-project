export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number)
  return newNumber
}

export const formatDate = (createdAt) => {
  const date = new Date(createdAt)
      const fomatDate = date.getDate()+
      "/"+(date.getMonth()+1)+
      "/"+date.getFullYear()+
      " "+date.getHours()+
      ":"+date.getMinutes()+
      ":"+date.getSeconds() 
  if (isNaN(date.getDate())) {
    return createdAt
  }
  return fomatDate
}

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type])
  if (type === 'colors') {
    unique = unique.flat()
  }
  if (type === 'services') {
    unique = data.map((item) => item.description[type])
    unique = unique.flat()
  }
  return ['all', ...new Set(unique)]
}
