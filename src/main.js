  
// 行人    
class passZombies {
    constructor(direction, id, src, position, moveDir) {
        this.direction = direction; // 过桥方向
        this.id = id;
        this.src = src;
        this.position = position;
        this.moveDir = moveDir;
        this.status = "WAIT"
    }
}
 


const app = new Vue({
    el: '#app',
    data: function () {
        return {
            count: 0,
            // 申请过桥--换方向
            switchDirect: false,
            // 当前过桥方向
            current: undefined,
            // 桥上是否有人
            busy: 0,
            // 过桥队列
            passQueue: [],
            // 生成僵尸的数组
            zombies: [],  
            direction: ["Right to Left", "Left to Right"],
            scheTimer: null,

        }
    },
    computed: {
        
    },
    methods: {
        createZombies() {
            // 生成通行方向随机的僵尸
            for (let i = 0; i < 8; i++){
                let src = "./src/image/" + Math.floor(Math.random() * 6) + ".gif";
                let dir = this.direction[Math.floor(Math.random() * 2)];
                let moveDir = "let moveDir";
                let position = "right-zombie";
                if (dir == "Right to Left") {
                    position = "right-zombie";
                    moveDir = " moveToLeft";
                }
                else {
                    position = "left-zombie";
                    moveDir = ' moveToRight';
                }
                let p = new passZombies(dir, this.count, src, position, moveDir);
                this.count++;
                this.passQueue.push(p);
                this.zombies.push(p);
            }
            //    console.log(this.passQueue);
        },
        getNext(direction) {
            let len = this.passQueue.length;

            for (let i = 0; i < len; i++){
                if (this.passQueue[i].direction == direction && this.passQueue[i].status == "WAIT") {
                    // 寻找索引
                    return this.passQueue.indexOf(this.passQueue[i])
                }
            }
            if (len != 0) {
                if(this.switchDirection == false)
                this.switchDirection();
                // this.current = this.passQueue[0];
                return -1;
            }
            else {
                return -1;
            }
        },
        // 调度
        scheduling() {
            // let that = this;  // 在定时器中，this指向window
            if (this.scheTimer)
                clearInterval(this.scheTimer);
            this.scheTimer = setInterval(function () {
                if (this.getNext(this.current) != -1) {   
                    this.busy++; // 桥上有人
                    let index = this.getNext(this.current);
                    this.passQueue[index].status = "RUN";
                    this.passQueue[index].position += this.passQueue[index].moveDir;
                    let timer2 = setTimeout(function () {
                        this.passQueue.splice(this.passQueue.findIndex(x => x.direction == this.current), 1);
                        this.busy--;
                    }.bind(this), 4000);
                }
                else
                    clearInterval(this.scheTimer);
            }.bind(this), 1100);    
        },
        // 改变方向
        switchDirection() {
            this.switchDirect = true;
            if (this.busy == 0) {
                this.current = this.passQueue[0].direction;
                this.switchDirect = false;
            }
            else {
                // this.current = this.passQueue[0];
                clearInterval(this.scheTimer);
            }
        },

        setTrClass(item) {
            return  item.direction == 'Right to Left' ? 'r-to-l' : 'l-to-r';
        },
        setPositon(item) {
            return item.direction == 'Right to Left' ? 'right-zombie' : 'left-zombie';
        },
   
    },
    watch: {
         
        busy: function () { 
            if (this.busy == 0 && this.passQueue.length != 0) {
                // 变向时，两种方向都有的情况
                if (this.switchDirect == true) {
                    // 关闭转向标志
                    this.switchDirect = false;
                    if (this.current == 'Right to Left' && this.getNext("Left to Right") != -1) {
                        this.current = "Left to Right";
                    }
                    else if (this.current == "Left to Right" && this.getNext("Right to Left") != -1) {
                        console.log('swicth Right to Left')
                        this.current = "Right to Left";
                    } else this.current = this.passQueue[0].direction;
                    this.scheduling();
                     
                } else {
                    this.current = this.passQueue[0].direction;
                    this.scheduling();
                }
               

                // 清除已经过桥的僵尸（DOM元素节点）
                while (this.zombies.findIndex(x => x.status == "RUN") + 1) {
                    this.zombies.splice(this.zombies.findIndex(x => x.status == "RUN"), 1);
                }
            } else if (this.passQueue.length == 0) {
                // 清除已经过桥的僵尸（DOM元素节点）
                while (this.zombies.findIndex(x => x.status == "RUN") + 1) {
                    this.zombies.splice(this.zombies.findIndex(x => x.status == "RUN"), 1);
                }
            }
        },
        
    },
    mounted: function () {
        this.createZombies();
        this.current = this.passQueue[0].direction;    
    }
})

 
