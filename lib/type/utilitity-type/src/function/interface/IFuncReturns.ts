import { IFunc } from './IFunc'
import { Numeric } from '@goldeimer/ts-numeric'

export interface IFuncReturns<
    Args,
    Returns
> extends IFunc<Args, Returns> {
    (...args: Args): Returns
}

export interface IFuncReturnsNumeric<
    ArgumentsType = [],
    NumericType = number
> {}

export interface IFuncReturnsString<
    ArgumentsType = [],
    StringType = string
> extends IFunc<ArgumentsType, StringType> {}

export interface IFuncReturnsInstanceOf<
    ArgumentsType = [],
    InstanceType
> extends IFunc<ArgumentsType, InstanceType> {}
