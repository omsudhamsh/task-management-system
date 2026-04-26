package com.example.taskmanagement.controller;

import com.example.taskmanagement.model.Task;
import com.example.taskmanagement.model.User;
import com.example.taskmanagement.repository.TaskRepository;
import com.example.taskmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Task> getTasks(Authentication auth) {
        User user = userRepository.findByUsername(auth.getName()).get();
        if (user.getRole() == User.Role.ADMIN) {
            return taskRepository.findAll();
        } else {
            return taskRepository.findByUser(user);
        }
    }

    @PostMapping
    public Task createTask(@RequestBody Task task, Authentication auth) {
        User user = userRepository.findByUsername(auth.getName()).get();
        if (user.getRole() == User.Role.ADMIN && task.getUser() != null && task.getUser().getId() != null) {
             task.setUser(userRepository.findById(task.getUser().getId()).orElse(user));
        } else {
             task.setUser(user);
        }
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task task = taskRepository.findById(id).get();
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        return taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}
