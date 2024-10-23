package dev.sch39.ecommerce_frontend.controllers.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("shop")
public class ShopController {
  @GetMapping({ "", "/" })
  public String index() {
    return "page/user/shop/index";
  }
}
