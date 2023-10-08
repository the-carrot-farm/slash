import {describe, it, expect} from "vitest";
import {TimeService} from "./time.service.ts";

const timeService = new TimeService()
describe('Time Service', () => {
    it('should return the current time in milliseconds', () => {
        //given
        const nowTime = new Date().getTime()

        //when
        const result = timeService.getNowMilliseconds();

        //then
        expect(result - nowTime).toBeLessThan(10)
    });
})