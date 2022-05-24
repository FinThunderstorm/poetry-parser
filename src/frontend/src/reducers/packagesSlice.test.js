import reducer, { getPackage } from './packagesSlice'

describe('packagesSlice', () => {
    test('Inital state is fine', () => {
        expect(reducer(undefined, {})).toEqual({
            packages: {},
            lockVersion: undefined,
            status: 'idle',
            error: null,
        })
    })

    test('getPackage returns object if found', () => {
        const state = {
            packages: {
                packages: {
                    atomicwrites: {
                        name: 'atomicwrites',
                        description: 'Atomic file writes.',
                        optional: 'false',
                        pythonVersions: [
                            '>=2.7',
                            '!=3.0.*',
                            '!=3.1.*',
                            '!=3.2.*',
                            '!=3.3.*',
                        ],
                        dependencies: {},
                        reverseDependencies: [
                            {
                                name: 'pytest',
                                installed: true,
                            },
                        ],
                    },
                },
                lockVersion: undefined,
                status: 'idle',
                error: null,
            },
        }

        expect(getPackage(state, 'atomicwrites')).toStrictEqual({
            name: 'atomicwrites',
            description: 'Atomic file writes.',
            optional: 'false',
            pythonVersions: [
                '>=2.7',
                '!=3.0.*',
                '!=3.1.*',
                '!=3.2.*',
                '!=3.3.*',
            ],
            dependencies: {},
            reverseDependencies: [
                {
                    name: 'pytest',
                    installed: true,
                },
            ],
        })
    })

    test('getPackage returns undefined if not found', () => {
        const state = {
            packages: {
                packages: {
                    atomicwrites: {
                        name: 'atomicwrites',
                        description: 'Atomic file writes.',
                        optional: 'false',
                        pythonVersions: [
                            '>=2.7',
                            '!=3.0.*',
                            '!=3.1.*',
                            '!=3.2.*',
                            '!=3.3.*',
                        ],
                        dependencies: {},
                        reverseDependencies: [
                            {
                                name: 'pytest',
                                installed: true,
                            },
                        ],
                    },
                },
                lockVersion: undefined,
                status: 'idle',
                error: null,
            },
        }

        expect(getPackage(state, 'tottoroo')).toBe(undefined)
    })
})
