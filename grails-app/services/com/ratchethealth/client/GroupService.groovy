package com.ratchethealth.client

class GroupService {

    def getGroups(params) {
        def start = params?.start
        def length = params?.length
        def group1 = new Group("G111", "rainier", "jan 19,2015","11")
        def group2 = new Group("G222", "proliance", "jan 19,2015", "22")
        def data = [group1 , group2]
        def map = [:]
        map.put(start, start)
        map.put(length, length)
        map.put("recordsTotal", 2)
        map.put("recordsFiltered", 2)
        map.put("data", data)
        return map
    }
}
