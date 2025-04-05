package com.ideia.sw.GetNow.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ideia.sw.GetNow.User;

public interface userRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
