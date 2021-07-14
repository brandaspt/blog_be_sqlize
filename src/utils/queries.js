export const updateValues = body => {
  const keysArr = Object.keys(body)
  const valuesArr = keysArr.map(key => `${key}='${body[key]}'`)
  const valuesStr = valuesArr.join(", ")
  return valuesStr
}
