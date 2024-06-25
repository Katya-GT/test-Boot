package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;
import java.util.List;

public interface RoleService {
    Role findByName(String name);
    List<Role> findAll();
    void save(Role role);
}
