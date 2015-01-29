package com.xplusz.ratchet

class AccountService {

    def loadAccounts(params) {

        def start = params?.start
        def length = params?.length
        def order = params?.order
        def columns = params?.columns
        def search = params?.search
        def map = [:]

        map.put(start, start)
        map.put(length, length)
        map.put(order, order)
        map.put(columns, columns)
        map.put(search, search)

        def account1 = new Account("001", "123098", "Sean", "Adelman", "sean.adelman@gh.com", "surgeon", "Patient Mgt", "Jan 19 2015 8:08")
        def account2 = new Account("002", "345654", "Sean", "Amann", "sean.aman@gh.com", "surgeon", "Patient Mgt", "Jan 19 2015 8:08")
        def account3 = new Account("003", "347564", "Wellesley", "Chapman", "well.chapman@gh.com", "Management", "Patient Mgt", "Jan 19 2015 8:08")

        def data = [account1, account2, account3]
        map.put("data", data)
        return map
    }
}
