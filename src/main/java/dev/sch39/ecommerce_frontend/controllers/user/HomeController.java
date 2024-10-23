package dev.sch39.ecommerce_frontend.controllers.user;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
  @GetMapping({ "", "/" })
  public String index(Model model) {
    return "page/user/home/index";
  }
}
