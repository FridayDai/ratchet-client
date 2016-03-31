package com.ratchethealth.client

import java.text.SimpleDateFormat


class Utils {
    static formatBirthday(dateStr) {
        if (!dateStr) {
            return ''
        }

        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone('America/Vancouver'))

        SimpleDateFormat sd1 = new SimpleDateFormat("yyyy-MM-dd")

        cal.clear()

        cal.setTime(sd1.parse(dateStr))

        SimpleDateFormat sd = new SimpleDateFormat("MMM d, yyyy")

        return sd.format(cal.time)
    }
}
