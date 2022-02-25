import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as CustomOption from './Option';

describe('Option', () => {
    it('should map number', () => {
        const expected = CustomOption.map<number, number>((a) => a + 5)(Option.some(1));
        expect(expected).toEqual(Option.some(6));
    });

    it('should map number with pipe', () => {
        const expected = pipe(
            {value: 1, _tag: 'Some'},
            CustomOption.map((a) => a + 5)
        );
        expect(expected).toEqual(Option.some(6));
    });

    it('should map string', () => {
        const expected = pipe(
            Option.some("Bonjour"),
            CustomOption.map((a) => a + ' Aurélien'),
        );
        expect(expected).toEqual(Option.some('Bonjour Aurélien'));
    });

    it('should chain', () => {
        const expected = pipe(
            Option.some(1),
            CustomOption.chain((a) => Option.some(a + 5)),
        );
        expect(expected).toEqual(Option.some(6));
    });

    it('should filter', () => {
        const expected = pipe(
            Option.some(2),
            CustomOption.filter((a) => a > 1),
        );
        expect(expected).toEqual(Option.some(2));
    });

    it('should filter out', () => {
        const expected = pipe(
            Option.some(0),
            CustomOption.filter((a) => a > 1),
        );
        expect(expected).toEqual(Option.none);
    });
});
