import React from "react"
class MyComponent1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHot: false
    }
    // &&& 这里解决的方法就是，通过原型上的change方法，复制一份到函数上，并且bind的对象是组件实例，所以最终会在组件实例上挂载一个change方法
    // 这样调用的方法就是组件实例上的了，this也就指向为组件实例了
    this.change = this.change.bind(this)
  }
  // render方法 是放在了MyComponent1的原型上
  render() {
    const { isHot } = this.state
    return <div onClick={this.change}>今天天气很{isHot ? "炎热" : "凉爽"}</div>
  }
  change() {// 这里的change是挂在了MyComponent1的原型上
    // 这里打印的this是undefined
    /**
     * 原因： change挂载在原型上， onClick={this.change} 这里找到的是原型上的change方法，而将this.change赋值给onClick后，再去执行
     * 点击事件的时候react是直接将这个复制的引用去执行，而不是使用实例去调用change方法，而类中的方法函数在局部都会开启严格模式，最终才导致
     * 执行后输出的this是undefined，这里可以这样解决 -》 &&&
     * 
     * 
     * 
     */
    console.log(this)
  }
}
export default MyComponent1