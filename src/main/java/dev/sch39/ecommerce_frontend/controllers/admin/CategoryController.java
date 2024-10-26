package dev.sch39.ecommerce_frontend.controllers.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/category")
public class CategoryController {
  @GetMapping({ "", "/" })
  public String index(Model model) {
    return "page/admin/category/index";
  }
}
