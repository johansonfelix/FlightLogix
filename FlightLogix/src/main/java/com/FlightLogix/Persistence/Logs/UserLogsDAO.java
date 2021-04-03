package com.FlightLogix.Persistence.Logs;


import com.FlightLogix.Core.Logs.UserLogs;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class UserLogsDAO {
    @PersistenceContext(name = "jpa-unit")
    private EntityManager em;

    public void createUserLog(UserLogs userLog) {
        em.persist(userLog);
    }
}
