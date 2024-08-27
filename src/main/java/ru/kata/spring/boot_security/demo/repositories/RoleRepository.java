package ru.kata.spring.boot_security.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.Set;


public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);

    Set<Role> findByUsers(User user);
}


