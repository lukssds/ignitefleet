const LICENSE_PALTE = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}'

export function validateLicensePlate(licensePlate: string) {
    const plate = licensePlate.toUpperCase()
    const isValid = plate.match(licensePlate)
    return isValid
}