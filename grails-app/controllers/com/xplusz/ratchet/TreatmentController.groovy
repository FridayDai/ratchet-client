package com.xplusz.ratchet

class TreatmentController extends BaseController {

    //    def beforeInterceptor = [action: this.&auth]

    def taskService

    def getTasks() {
        def tasks = taskService.loadTasks()
        def taskOverdue = []
        def taskNew = []
        def taskFuture = []
        def taskCompleted = []
        for (task in tasks) {
            if (task.status == "overdue") {
                taskOverdue.add(task)
                continue
            }
            if (task.status == "new") {
                taskNew.add(task)
                continue
            }
            if (task.status == "future") {
                taskFuture.add(task)
                continue
            }
            if (task.status == "complete") {
                taskCompleted.add(task)
            }

        }
        render view: 'task', model: [taskOverdue: taskOverdue, taskNew: taskNew, taskFuture: taskFuture, taskCompleted: taskCompleted]
    }

}
