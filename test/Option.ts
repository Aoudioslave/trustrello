import *  as Option from "fp-ts/Option";

export const map = <A,B>(fn:(a: A) => B ) => (b: Option.Option<A>): Option.Option<B> => b._tag === 'Some' ? Option.some(fn(b.value)) : b;

export const chain = <A,B>(fn:(a: A) => Option.Option<B> ) => (b: Option.Option<A>): Option.Option<B> => b._tag === 'Some' ? fn(b.value) : b;

export const filter = <A>(fn:(a: A) => boolean ) => (b: Option.Option<A>): Option.Option<A> => b._tag === 'Some' && fn(b.value) ? b : Option.none;
