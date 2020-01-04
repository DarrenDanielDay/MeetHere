// Generated by Selenium IDE
import org.junit.jupiter.api.*;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsNot.not;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class SignUpTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @BeforeEach
  public  void setUp() {
    System.setProperty("webdriver.chrome.driver","E:\\学习资料\\软测\\test\\chromedriver.exe");
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @AfterEach
  public void tearDown() {
    driver.quit();
  }
  @ParameterizedTest
  @CsvSource({"494812@qq.c,12312312312,abcd,123456","'',12312312312,abcd,123456","494812,12312312312,abcd,123456",
          "494812@qq.c,1231231,abcd,123456","494812@qq.c,12312312312,'',123456","494812@qq.c,12312312312,abcd,123456",
          "494812@qq.c,12312312312,1abcd,123456","494812@qq.c,12312312312,abcd,''","494812@qq.c,12312312312,abcd,123"})
  public void SignUpTest(String email,String phone,String name,String se) {
    driver.get("http://localhost:8080/");
    driver.manage().window().setSize(new Dimension(1536, 824));
    {
      WebElement element = driver.findElement(By.cssSelector(".register-button > .btn"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).clickAndHold().perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector(".register-button > .btn"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector(".register-button > .btn"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).release().perform();
    }
    driver.findElement(By.cssSelector(".register-button > .btn")).click();
    {
      WebElement element = driver.findElement(By.cssSelector(".register-button > .btn"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.tagName("body"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element, 0, 0).perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector(".el-form-item:nth-child(1) .el-input__inner"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).clickAndHold().perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector(".el-form-item:nth-child(1) .el-input__inner"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector(".el-form-item:nth-child(1) .el-input__inner"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).release().perform();
    }
    driver.findElement(By.cssSelector(".el-form-item:nth-child(1) .el-input__inner")).click();
    driver.findElement(By.cssSelector(".el-form-item:nth-child(1) .el-input__inner")).sendKeys(email);
    driver.findElement(By.cssSelector(".el-form-item:nth-child(2) .el-input__inner")).sendKeys(phone);
    {
      WebElement element = driver.findElement(By.cssSelector(".el-form-item:nth-child(3) .el-input__inner"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).clickAndHold().perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector(".el-form-item:nth-child(3) .el-input__inner"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector(".el-form-item:nth-child(3) .el-input__inner"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).release().perform();
    }
    driver.findElement(By.cssSelector(".el-form-item:nth-child(3) .el-input__inner")).click();
    driver.findElement(By.cssSelector(".el-form-item:nth-child(3) .el-input__inner")).sendKeys(name);
    {
      WebElement element = driver.findElement(By.cssSelector(".el-form-item:nth-child(4) .el-input__inner"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).clickAndHold().perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector(".el-form-item:nth-child(4) .el-input__inner"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector(".el-form-item:nth-child(4) .el-input__inner"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).release().perform();
    }
    driver.findElement(By.cssSelector(".el-form-item:nth-child(4) .el-input__inner")).click();
    driver.findElement(By.cssSelector(".el-form-item:nth-child(4) .el-input__inner")).sendKeys(se);
    {
      WebElement element = driver.findElement(By.cssSelector(".el-button"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).clickAndHold().perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector(".el-button"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector(".el-button"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).release().perform();
    }
    driver.findElement(By.cssSelector(".el-button")).click();
    if (email.equals(""))
    {
      assertThat(driver.findElement(By.cssSelector(".el-form-item:nth-child(1) .el-form-item__error")).getText(), is("请输入邮箱"));
    }
    if (phone.equals(""))
    {
      assertThat(driver.findElement(By.cssSelector(".el-form-item:nth-child(1) .el-form-item__error")).getText(), is("请输入固定电话"));
    }
    if (name.equals(""))
    {
    assertThat(driver.findElement(By.cssSelector(".el-form-item:nth-child(3) .el-form-item__error")).getText(), is("请输入用户名"));
    }
    if (se.equals(""))
    {
    assertThat(driver.findElement(By.cssSelector(".el-form-item:nth-child(4) .el-form-item__error")).getText(), is("请输入密码"));
    }
    if (email.equals("494812"))
    {
    assertThat(driver.findElement(By.cssSelector(".el-form-item:nth-child(1) .el-form-item__error")).getText(), is("邮箱格式不正确"));

    }
    if (phone.equals("1231231"))
    {
    assertThat(driver.findElement(By.cssSelector(".el-form-item:nth-child(2) .el-form-item__error")).getText(), is("固定电话的格式不正确"));
    }
    if (name.equals("1abcd"))
    {
    assertThat(driver.findElement(By.cssSelector(".el-form-item:nth-child(3) .el-form-item__error")).getText(), is("用户名不可以数字开头"));
    }
    if (se.equals("123"))
    {
      assertThat(driver.findElement(By.cssSelector(".el-form-item:nth-child(4) .el-form-item__error")).getText(), is("密码至少6位"));
    }
    if (email.equals("494812@qq.c")&&phone.equals("12312312312")&&name.equals("abcd")&&se.equals("123456")){

    assertThat(driver.findElement(By.cssSelector(".el-message")).getText(), is("注册成功！"));
    }
  }
}
