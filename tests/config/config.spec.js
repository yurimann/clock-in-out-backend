const config = require('../../app/config/config')

describe('.config.get', () => {
        it('must return the value of the nested config property', () => {
            const configAppName = config.get('app.name')

            const expectedAppName = 'himama'
            expect(configAppName).toEqual(expectedAppName)
        })
    })

    describe('given a non-existent config property', () => {
        it('must throws a not defined error for non-existent config property at root level', () => {
            const configNonExistentProperty = () => {
                config.get('nonExistentProperty')
            }

            expect(configNonExistentProperty).toThrowError(
                /^Config property 'nonExistentProperty' is not defined.$/
            )
        })

        it('must throws a not defined error for non-existent nested config property', () => {
            const configNonExistentProperty = () => {
                config.get('app.nonExistentProperty')
            }

            expect(configNonExistentProperty).toThrowError(
                /^Config property 'app.nonExistentProperty' is not defined.$/
            )
        })
    })

    describe('given an invalid config property', () => {
        it('must throws an invalid error for an undefined config property', () => {
            const configNonExistentProperty = () => {
                config.get(undefined)
            }

            expect(configNonExistentProperty).toThrowError(
                /^Invalid property 'undefined' has been provided.$/
            )
        })
        it('must throws an invalid error for a null config property', () => {
            const configNonExistentProperty = () => {
                config.get(null)
            }

            expect(configNonExistentProperty).toThrowError(
                /^Invalid property 'null' has been provided.$/
            )
        })
    })