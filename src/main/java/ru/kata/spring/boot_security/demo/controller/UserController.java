//package ru.kata.spring.boot_security.demo.controller;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import ru.kata.spring.boot_security.demo.model.User;
//import ru.kata.spring.boot_security.demo.service.UserService;
//
//
//@RequestMapping("/user")
//public class UserController {
//    @GetMapping
//    public String userPage(Model model, @AuthenticationPrincipal User user) {
//        model.addAttribute("user", user);
//        return "user";
//
//    }
//}


