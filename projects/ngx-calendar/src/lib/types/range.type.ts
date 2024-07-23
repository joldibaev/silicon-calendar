export type NumberRange<N extends number, Result extends number[] = []> =
  Result['length'] extends N ? Result[number] : NumberRange<N, [...Result, Result['length']]>;

