// Observer<T> = T => void;观察者的类型
// Observable<T> = Observer<T> => void;可观察变量的类型

// data$ :: Observable<number> = Observer<numbser> => void;
const theRiverOfHeraclitus$  = observer => {//这就是一个响应式变量，就是这么任性
    observer(0);
    observer(1);
    let state = 1;
    setInterval(() => {
        state++;
        observer(state);
    }, 1000);
};
//还没发挥余热，就被消耗掉了
// theRiverOfHeraclitus$((theStateOftheRiver) => {
//     console.log(theStateOftheRiver);
// });

// Morphism<T, R> = T => R;态射的类型
// MapFunctor<T, R> = Morphism<T> => Observable<T> => Observable<R>;map函子的类型

//定义值范畴到可观察对象范畴的map函子
const map = f => observable => {//把值范畴的态射f提升到可观察变量范畴去
    return observer => {//可观察变量范畴的态射返回值当然还是可观察变量
        observable(x => {
            observer(f(x));
        });
    };
};

//定义flatMap函子
const flatMap = f => observable => {
    return observer => {
        observable(x => {
            f(x)((y) => {
                observer(y);
            });
        });
    };
};
//窥探值，做一些副作用
const tap = (effect) => (observable) => {
    return observer => {
        observable(x => {
            effect(x);
            observer(x);
        })
    }
}
//定义函数的复合
const compose = (...args) => args.reduceRight((acc, f) => (x) => f(acc(x)));
//从下往上，从右到左读代码
const theShipOfTheseus$ = compose(
    map(x => x + '->' ),
    tap(x => {
        console.log('船员看到了这条河:' + x);
    }),
    map(x => x * 2.718281828459)
)(
    theRiverOfHeraclitus$
);
//我们也可以把这种关系给命名
const mapTheRiverToTheShip = compose(
    map(x => x + '->' ),
    tap(x => {
        console.log('船员看到了这条河:' + x);
    }),
    map(x => x * 2.718281828459)
);
const theShipOfTheseus$ = mapTheRiverToTheShip(theRiverOfHeraclitus$);