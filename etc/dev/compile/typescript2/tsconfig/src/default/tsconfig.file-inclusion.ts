import { TsConfig } from '../schema'

export const fileInclusion: TsConfig<4.1> = {
    references: [],
    typeAcquisition: {
        enable: true,
        exclude: [],
        include: []
    }
}
