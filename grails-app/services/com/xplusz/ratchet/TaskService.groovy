package com.xplusz.ratchet

class TaskService {

    def loadTasks() {

        def task1 = new Task("001", "Rotator Cuff Essential", "basic", "overdue")
        def task2 = new Task("002",  "Rotator Cuff Vanilla", "sdm", "overdue")
        def task3 = new Task("003", "Rotator Cuff Essential", "basic", "new")
        def task4 = new Task("004", "Rotator Cuff Essential", "sdm", "new")
        def task5 = new Task("005", "Knee Injury and Osteoarthritis Outcome Score", "outcome", "future")
        def task6 = new Task("006", "Rotator Cuff Essential", "basic", "future")
        def task7 = new Task("007", "Rotator Cuff Essential", "basic", "complete")
        def task8 = new Task("008", "Rotator Cuff Essential", "outcome", "complete")
        def task9 = new Task("009", "Rotator Cuff Essential", "basic", "overdue")


        def data = [task1, task2, task3, task4, task5, task6, task6, task7, task8, task9]
        return  data
    }
}
