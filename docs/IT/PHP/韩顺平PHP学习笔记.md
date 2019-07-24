#php学习笔记

## php历史

## php基本语法

## OOP 面向对象编程 

### 类与对象

1. 类是抽象的、概念的，代表一类事物
2. 对象是具体的，实际的，代表一个具体事物
3. 类是对象的模版，对象是类的一个个实例。

#### 如何定义一个类

``` 
class Cat{
	//声明成员属性 （变量）
	public $name; //属性必需要有访问控制符
	protected $age;
	private $owner;
}
```

#### 类名规范 

1. 首字母大写（ 但是  $cat1 = new CAT(); //类名 不区分大小写）
2. 驼峰命名 
3. 名词在前 
4. 动词在后

#### 如何创建对象

```
$cat1 = new Cat;

$cat1 = new Cat();
```

#### 成员属性/成员变量

​	是类的组成部分，可以是基本数据类型或符合数据类型（对象、数组）或资源或NULL

##### 访问成员属性

```
echo $cat1->name; //使用对象运算符  ->
```

#####对象运算符  ->

##### 对象传递机制

```
	$cat1 = new Cat();
	$cat1->name = 'xiaohua';
	$cat2 = $cat1; //值传递：传递的是对象的引用reference，对象标识符
	$cat2 = 'abc'; //不影响$cat1
	
	$cat3 = &$cat1; //地址引用
	$cat3 = 'def'; //此时改变了$cat1
	
```

#### 查看对象标识符 #1

​	var_dump($cat1);

#### 成员函数/成员方法

```
class Cat{
	//声明成员属性 （变量）
	public $name; //属性必需要有访问控制符
	protected $age;
	
	public function cry(){
		echo 'miao';
	}
}
```

##### 调用成员函数

```
$cat1 = new Cat;
//cry();//不可以直接调用
$cat1->cry();
```

#### 构造函数__construct

1. 是类的一个特殊方法
2. 主要作用是 创建对象时 直接**初始化** 赋值
3. 没有返回值
4. 实例化对象时 系统会自动调用
5. 构造函数只能有一个
6. 老版本（php4中）构造函数和类名相同 (改类名了怎么办？)，如果有2个形式的构造函数，则优先使用__construct
7. 如果定义构造函数后，会覆盖系统默认的空构造函数
8. 默认的构造函数方法访问修饰符是public

##### this 当前对象（调用者）

1. 系统会给每个对象分配this，代表当前对象（自己的，我的）
2. this时当前的**执行环境** 
3. this不能在类外部使用

```
class Cat{
	public $name;
	public $age;
	
	public function __contruct($iname,$iage){
		//$name = $iname;
		var_dump($this);
		$this->name = $iname;
		$this->age = $iage;
	}

}

$cat1 = new Cat('xiaohua',3);
echo $cat1->name . $cat1->age;
```

#### 析构函数__destruct

作用：释放相关资源

code：```function __destruct() { }```

先创建的对象后销毁 栈

###### 说明

1. 当没有变量指向某个对象时（所有引用都被删除），这个对象就会被销毁
2. 在对象销毁之前，会调用析构函数
3. 析构函数不是销毁对象本身，而是销毁对象创建的相关资源，如数据库连接等

###### 使用场合/最佳事件

1. 希望在程序还没结束前，就销毁某些实例（显性删除 $cat1 = null;或指向其他）
2. 及时销毁对象创建的资源，如数据库连接等

#### 垃圾回收♻️机制

	1. 当一个对象没有任何引用（变量）指向它的时候，就会成为一个垃圾对象，php就会启动垃圾回收器将其销毁
 	2. 当程序退出前，php也将启用垃圾回收器，销毁对象
 	3. php5.3自后对垃圾回收算法优化，解决了**引用环**问题
 	4. 对象标识符合的引用次数, 每个对象都会分配一个计数器

### 类的魔术方法 Magic methods

1. 在满足某种条件下会被系统自动调用（不可手动调用）
2. 都是以——开头的函数

####一览表

1. __construct
2. __destruct
3. __call  当对象调用一个不可访问或不存在的方法时，\_\_call会被调用。
4. __callStatic
5. __set
6. __get
7. __isset
8. __unset
9. __sleep
10. __wakeup
11. __toString
12. __set_state
13. __clone

#### 访问修饰符

对属性或方法的访问控制 Access Control 通过在前面添加关键字 public protected private

|      | public | protected | private |
| ---- | ------ | --------- | ------- |
| 类内 | √      | √         | √       |
| 类外 | √      | X         | X       |
| 子类 | √      | √         | X       |

在类外访问private和protected属性，需要定一个public getAtt() 绕行

####  __get \_\_set 

对类中不可访问/不存在的属性 访问/读取时 __get 会被自动调用

对类中不可访问/不存在的属性 设置/赋值时 __set 会被自动调用

应用： 松散型的php：给不存在的属性赋值时，会设置成功 ！使用--set可以友好提示！

####  \_\_isset \_\_unset

对类中不可访问/不存在的属性 进行 isset() / empty()时 __isset 会被自动调用

对类中不可访问/不存在的属性 进行 unset()时 __unset 会被自动调用

#### __call

```
class Cat{
	public function __call($method, $agrs){
		return $this->$agrs[0]($agrs[1],$agrs[2]);
	}
	public function getSum($n1,$n2){
		return $n1+$n2;
	}
}

$cat = new Cat;
$cat->play('getSum',1,2); //3
```

### __autoload 类的自动/动态加载



当使用一个没有定义过的类时，就会/才会自动触发__autoload函数

```
<?php
//init.php

function myAutoload($className){
	require "./Models/$className.php";
}

/* 

$classMap =['Cat'=>'../Models/Cat.class.php'];

function __autoload($className){
  global $classMap;
	require "./Class/$className.php";
}

*/
$cat = new Cat();

spl_autoload_register('myAutoload');

```

### 类的静态属性

####静态变量

所有对象共享公共的数据 ，可以在定义的时候初始化。

初始化在类加载时

####静态变量定义

```
public static $counts =0;
```

####静态变量定义访问

​	类内访问 ：范围解析符 self::**$**counts++;

​	类外+类内 Cat::**$**counts; (需要时public)

任何一个对象访问时，获取的时相同的值

#### 范围解析符 ::

 self:: 

####对象运算符  ->

#### $this与self::区别

### 类的静态方法

静态方法也叫类方法

#### 定义

```
public static function cry(){

}
```

#### 使用场景 （单例模式）

- 操作静态变量
  - 静态方法中不可以访问/操作 非静态 属性/变量
- 没有对象实例的话，也可以调用方法

####调用

- 在类的外部调用静态方法, 则必需为public
  - Cat::cry();
  - $cat1->cry();//不推荐
  - ~~$cat1::cry(); //极不推荐~~
- 在类的内部调用静态方法，
  - self::cry(); //推荐
  - Cat::cry(); //不推荐
  - ~~$this->cry(); //极不推荐~~

#### 细节



###  封装

- 把同一类食物的属性和行为 包装起来

### 继承
是单继承的，一个类最多有一个父类
简洁，纯洁性
接口可以补充无法多继承的缺陷！

### 重载overloading

#### __call 实现同名函数但不同参数

####属性的重载(动态添加属性) \_\_get() \_\_set()

```
class Cat{
	protected $pro_array = [];
	public function __set($pro_name,$val){
		$this->pro_array[$pro_name] = $val;
	}
	public function __get($pro_name){
	 return $this->pro_array[$pro_name];//if isset
	}
}
$cat = new Cat();
$cat->name = 'xiaohua';

```

### 重写 override

子类重写父类public/protected方法或属性

重写要求 函数名和参数个数 完全一致

重写方法内 访问父类的的静态属性 parents::$total，但这个静态属性必需可以被子类访问（即public或protected）

子类可以调用父类的构造方法 parents::__construct();

子类必需要和父类的 类型约束 保持一致

子类方法不能缩小父类访问权限 Access Level

### 类型约束

- 对象
- 数组 array
- callable 毁掉函数
- 如果默认值null，调用时可以为NULL
- 不能是int string traits

### 属性重写



### 抽象类（abstract）

#### 为什么要使用抽象类技术

- 规范类的设计（模糊设计一个类拥有的行为）
- 关键词： abstract
- 抽象类abstract不可以实例化
- 抽象类可以没有抽象方法，但包含抽象方法的类一定是抽象类

#### 抽象方法

- 抽象方法不能有函数体： abstract public function say();
- 继承子类必需实现抽象类的所有abstract方法，除非它也是abstract类
- 重写overwrite子类实现的方法的访问修饰符 >= 父类

#### 抽象类与抽象方法的关系

- 如果一个类包含抽象方法，那么这个类一定是抽象类

- 抽象类中可以包含非抽象方法

### 接口 interface

- 接口就是生命一个方法，供其他类来实现
- 设计思想： 高内聚低耦合
- 接口就是规范，是更加抽象的抽象类，解决多层继承耦合问题

```interface iName{
interface iName{
  //属性 iName::A
  const A=90 
  //方法
}

class iPhone extents Phone implements 接口1，接口2{
    //必需实现接口1和2的所有方法
} ```

//接口之间可以多继承 
interfact iUsb extents iUsb1 iUsb2{
}

```

####使用场合

- 定规范
- 多个同级类，同样方法wrtie()又有不同的行为。比如，有的写数据库，有的写文件

#### 细节

1. 不能实例
2. 接口的所有方法都不能有方法体
3. 可以实现多个接口
4. 接口中的属性必需是 public常量
5. 接口的方法都必需是public
6. 接口之间可以多继承 

在不打破继承关系的前提下扩充类功能，非常灵活

### final类
不希望任何类继承的类
不可以覆盖重写的方法也可以使用final修饰
Final 方法可以被继承，但不可以重写
final类是可以被实例化的
final public say（）｛｝
不能修饰属性
### 类常量 const
不允许改动的 比如圆周率 不用$符号，大写，必须赋值，都必须是public 

### 多态

php天生就是多态语言，可以通过继承父类或实现接口来体现多态。

好处：代码维护或扩展

```
class Animal{
	public $name;
	function __construct($name){
		$this->name = $name;
	}
}

class Dog extends Animal{
	public function showInfo(){
		return $this->name;
	}
}

class Cat extends Animal{
	public function showInfo(){
		return $this->name;
	}
}

class Food{
	public $name;
	function __construct($name){
		$this->name = $name;
	}
}

class Fish extends Food{
	public function showInfo(){
		return $this->name;
	}
}

class Bone extends Food{
	public function showInfo(){
		return $this->name;
	}
}

class Master {
	public	$name;
	
	// 这里实现了多态！！！使用类型约束 限定 一下更好！
	public function feed(Animal $animal, Food $food){
		echo PHP_EOL. $animal->showInfo();
		echo '喜欢吃';
		echo PHP_EOL. $food->showInfo();
	}
}

$master = new Master('xiaohong');
$cat = new Cat('小花猫');
$fish = new Fish('小鱼鱼');
$master->feed($cat, $fish);

$dog = new Dog('大黄');
$bone = new Fish('大棒骨🦴');
$master->feed($dog, $bone);

```

### 对象的遍历

- 对象遍历只能遍历对象的属性值
- 在类外遍历时，只能遍历到public属性
- 如果要遍历所有属性，需要成员方法在 实例里/类里 遍历

```
public class Dog{
	public $name='xiaomao';
	private $age=1;
	protected $color;
	//内部可以访问到所有属性
	function getVars(){
		foreach($this as $key=>$val){
			echo PHP_EOL."$key=>$val";
		}
	}
}

$dog1 = new Dog();
//外部遍历到public属性
foreach($dog as $key=>$val){
	echo PHP_EOL."$key=>$val";
}

```



#### 内置标准类 stdClass

- php中有一个类 stdClass，不需要创建就可以使用
- 通常以对象的方式管理数据

```
$person = new stdClass();
var_dump($person);
$person->name = '猪八戒';
var_dump($persion);
```



#### 其他数据类型 转换成对象

```
$heros = ['no1'=>'宋江'，'no2'=>'小吴'];
//当我们把一个数组转换成一个对象后，
//它成为一个stdClass对象实例
//如果是一个关联数组，数组的key编程属性名
//如果是一个索引数组？？？
$heros = (object) $heros;


$age=90;
$age = (object) $age;
```

### serialize un-serialize

- 对象的序列化和反序列化

- 序列化 保存为字符串 \$str = serialize($obj1);
- 反序列化 把字符串还原为原来的对象，需要引入类的定义
  - $obj1 = unserialize(\$str);

### trait

````
trait Abc{
	function sum($n1,$n2){
		return $n1+$n2;
	}
	function getMax($arr){
		return max($arr);
	}
}

class Cde{
	use Abc;
}
````

- 代码函数级别复用
- trait不可以实例化
- 优先级为最低，可以覆盖



### 反射 ReflectionClass

```
class IndexAction{
	public function index(){
		echo 'Index';
	}
	public function test(){
		echo PHP_EOL.__CLASS__.__FUNCTION__.__LINE__;
	}
	
	public function _before_index(){
		echo PHP_EOL.__CLASS__.__FUNCTION__.__LINE__;
	}
	
	public function _after_index(){
		echo PHP_EOL.__CLASS__.__FUNCTION__.__LINE__;
	}
}
//
var_dump(Reflection::export('IndexAction'));

//需求是 IndexAction中的方法和访问控制符是不确定的。如果是public，可以执行
//如果存在before/after方法，并且是public，则执行

$reflector = new ReflectionClass('IndexAction');
if($reflector->hasMethod('index')){
	echo 'has-index';
	$reflectorIndex = $reflector->getMethod('index');
	if($reflectorIndex->isPublic()){
		echo 'index is public';
		//before
		if($reflector->hasMethod('_before_index')){
			$reflectorBefore = $reflector->getMethod('_before_index');
			if($reflectorBefore->isPublic()){
				$reflectorBefore->invoke(new $reflector->newInstance());
			}
		}
		//index
		
		//after
	}
}else{
	echo 'no-index';
}
```

