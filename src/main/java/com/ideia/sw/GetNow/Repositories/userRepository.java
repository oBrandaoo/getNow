package com.ideia.sw.GetNow.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ideia.sw.GetNow.User;

@Repository
public interface userRepository extends JpaRepository<User, Long> {
}
