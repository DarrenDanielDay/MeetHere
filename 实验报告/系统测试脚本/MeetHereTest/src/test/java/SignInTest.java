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
public class SignInTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @BeforeEach
  public void setUp() {
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
  @CsvSource({"亚当,123456","'',123456","亚当122343,123456","亚当,''","亚当,1234"}
          )
  public void signIn(String name,String se) {
    System.out.println((name+se));
    driver.get("http://localhost:8080/");
    driver.manage().window().setSize(new Dimension(1221, 825));
    driver.findElement(By.cssSelector(".login-button > .btn")).click();
    {
      WebElement element = driver.findElement(By.cssSelector(".login-button > .btn"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.tagName("body"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element, 0, 0).perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector("#pane-user .el-form-item:nth-child(1) .el-input__inner"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).clickAndHold().perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector("#pane-user .el-form-item:nth-child(1) .el-input__inner"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector("#pane-user .el-form-item:nth-child(1) .el-input__inner"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).release().perform();
    }
    driver.findElement(By.cssSelector("#pane-user .el-form-item:nth-child(1) .el-input__inner")).click();
    driver.findElement(By.cssSelector("#pane-user .el-form-item:nth-child(1) .el-input__inner")).sendKeys(name);
    driver.findElement(By.cssSelector("#pane-user .el-form-item:nth-child(2) .el-input__inner")).sendKeys(se);
    {
      WebElement element = driver.findElement(By.cssSelector(".el-button--primary"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).clickAndHold().perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector(".el-button--primary"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.cssSelector(".el-button--primary"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).release().perform();
    }
    if(se.equals(""))
    {

    assertThat(driver.findElement(By.cssSelector(".el-form-item:nth-child(2) .el-form-item__error")).getText(), is("请输入密码"));
    }
    if(name.equals(""))
    {
      assertThat(driver.findElement(By.cssSelector(".el-form-item:nth-child(1) .el-form-item__error")).getText(), is("请输入用户名"));
    }
    if(name.equals("亚当122343"))
    {
      driver.findElement(By.cssSelector(".el-button--primary")).click();
      assertThat(driver.findElement(By.cssSelector(".el-message__content")).getText(), is("登录失败！用户不存在！"));
    }
    if(se.equals("1234"))
    {
      driver.findElement(By.cssSelector(".el-button--primary")).click();
      assertThat(driver.findElement(By.cssSelector("el-message__content")).getText(), is("登录失败！密码错误！"));
    }
    if(se.equals("123456")&&name.equals("亚当"))
    {
      driver.findElement(By.cssSelector(".el-button--primary")).click();
      assertThat(driver.findElement(By.cssSelector(".el-message")).getText(), is("登录成功"));
    }
  }
}
