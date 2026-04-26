package com.example.taskmanagement;

import com.example.taskmanagement.model.User;
import com.example.taskmanagement.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DbCheckRunner implements CommandLineRunner {
    private final UserRepository userRepository;

    public DbCheckRunner(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        List<User> users = userRepository.findAll();
        long adminCount = users.stream().filter(u -> "ADMIN".equals(u.getRole())).count();
        long userCount = users.stream().filter(u -> "USER".equals(u.getRole())).count();
        
        System.out.println("--- DB STATUS START ---");
        System.out.println("Total Users: " + users.size());
        System.out.println("Admins: " + adminCount);
        System.out.println("Users: " + userCount);
        System.out.println("User List:");
        users.forEach(u -> System.out.println(" - " + u.getUsername() + " (" + u.getRole() + ")"));
        System.out.println("--- DB STATUS END ---");
    }
}
