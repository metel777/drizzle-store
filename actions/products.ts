import { db } from "@/database/database";
import { user_cart, products } from "@/database/schema";
import { verifyAuthSession } from "@/lib/auth";
import { desc, eq, sql } from "drizzle-orm";

type Product = {
    title: string
    imageUrl: string
    price: number
    description: string
    id?: any
}

// export function fetchAll({ paramsPage }: { paramsPage: string }) {
export function fetchAll() {

    return db
        .select()
        .from(products)
        .orderBy(desc(products.createdAt))
}

export function getProductById(id: any) {
    return db
        .select()
        .from(products)
        .where(eq(products.id, id))
}

export async function addProduct({ title, imageUrl, price, description }: Product) {
    await db
        .insert(products)
        .values({ title, imageUrl, price, description, createdAt: new Date, updatedAt: new Date })
}

export async function updateProduct({ id, title, imageUrl, price, description }: Product) {
    await db.update(products).set({ title, imageUrl, price, description, updatedAt: new Date }).where(eq(products.id, id))
}

export async function deleteProduct(id: any) {
    await db.delete(products).where(eq(products.id, id))
}

interface TotalPrice {
    totalPrice: Number
}

export async function getTotalPrice(){

    const { user } = await verifyAuthSession()
    try {
        const res = await db.execute(sql`
            SELECT SUM(${products.price} * ${user_cart.quantity}) AS total_price
            FROM ${user_cart} 
            JOIN ${products} ON ${user_cart.productId} = ${products.id}
            WHERE ${user_cart.userId} = ${user?.id};
            `)
            // console.log(res.rows)
        return res.rows
        
    } catch (error) {
        console.log(error)
    }
    

}

export async function insertDefaultValues() {
    await db.insert(products).values({ title: 'Book 1', imageUrl: 'https://static01.nyt.com/images/2024/01/06/books/06kristin-hannah-cover/06kristin-hannah-cover-articleLarge.jpg?quality=75&auto=webp&disable=upscale', description: "A book description is a brief overview of the plot, main characters, and themes of the story. It's an important tool that helps in book promotion and sales. Many times, book descriptions also include information about the author. This helps to build credibility and establish a connection with the reader.", price: 10, createdAt: new Date, updatedAt: new Date })
    await db.insert(products).values({ title: 'Book 2', imageUrl: 'https://smartmobilestudio.com/wp-content/uploads/2012/06/leather-book-preview.png', description: "Once you have their attention, then describe the current pain they are in. If you can describe the pain of the reader you can engage them in entertaining the idea of buying the book. You don’t need to be gratuitous here, all you need to do is be accurate: what pain is in their life? What unsolved problems do they have? Or, what unachieved aspirations grand goals do they have? Clearly and directly articulate these, in plain and simple language.", price: 15, createdAt: new Date, updatedAt: new Date })
    await db.insert(products).values({ title: 'Book 3', imageUrl: 'https://i.ebayimg.com/thumbs/images/g/p74AAOSwqiRcbCuG/s-l640.jpg', description: "Like a cliffhanger. This holds the reader’s attention and leaves them wanting more. You do want to be very explicit about what they will learn, but you don’t have to go deep into the “how.” This is to create an “open loop” so to speak; you are keeping back the secret sauce that is actually in the book This being said, do not make the reader struggle to understand what your point is, or how to get the reader there. This is especially true for prescriptive books (how-to, self-help, motivational, etc.). People like to understand the basics of the “how” (as well as the “what”), especially if it’s something new or novel. This is a balance that our examples will show you how to hit.", price: 20, createdAt: new Date, updatedAt: new Date })
    await db.insert(products).values({ title: 'Knife 1', imageUrl: 'https://aaknives.eu/wp-content/uploads/2023/06/aaknives-hand-forged-dabascus-steel-blade-knife-handmade-custom-made-knife-handcrafted-knives-autinetools-northmen-15-1.jpg', description: "This versatile knife has lots to love, including dimples above the cutting edge that help keep food from sticking. It has a super sharp, double-beveled blade for clean, smooth cuts, and we found this knife cuts through both tomatoes and chives cleanly, leaving no jagged edges or uncut bits. Even with dense food like sweet potato, this knife is a star: It sliced through effortlessly without sticking halfway through as some other blades might.Rock solid knife for all sorts of kitchen tasks,” says Food & Wine Editor-in-Chief Hunter Lewis. “It handled all of the tasks for this testing cleanly and easily.” The feel of the knife is excellent, too: We found it has enough clearance between the handle and blade so our fingers didn't touch the cutting board as we chopped, and it felt balanced in our hands.", price: 444, createdAt: new Date, updatedAt: new Date })
    await db.insert(products).values({ title: 'Knife 2', imageUrl: 'https://www.foodandwine.com/thmb/RvhIQ0hYM2enYbH5D7Kg-sF5fRQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Food_Wine_MacKnifeProfessionalHollowEdgeKnife_007_DB_1-7360469a1744467b854927993b62f301.jpg', description: "You may already love veggies, or maybe you're trying to eat more of them, but whatever you cook now, vegetables are almost certainly a part of it. With some basic knife skills and the right knife for you, chopping, dicing, slicing, julienning, and mincing is a breeze, making it even easier to prepare and enjoy the vegetables you love. We've tested countless knives over the years, narrowing down the three knives you need most, plus our favorite chefs' knives, Japanese knives, and paring knives. Now, we're turning our expertise towards vegetable knives. Here are our favorites.", price: 160, createdAt: new Date, updatedAt: new Date })

    await db.insert(products).values({ title: 'Cook hat', imageUrl: 'https://m.media-amazon.com/images/I/516olT78PVL._AC_UY1000_.jpg', description: "The toque is a chef's hat that dates back to the 16th century. Different heights may indicate rank within a kitchen and the number of folds can also signify a chef's expertise, with each pleat representing a technique that has been mastered.", price: 9, createdAt: new Date, updatedAt: new Date })

    await db.insert(products).values({ title: 'Banana', imageUrl: 'https://i5.walmartimages.com/seo/Fresh-Banana-Fruit-Each_5939a6fa-a0d6-431c-88c6-b4f21608e4be.f7cd0cc487761d74c69b7731493c1581.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF', description: "A banana is a curved, yellow fruit with a thick skin and soft sweet flesh. If you eat a banana every day for breakfast, your roommate might nickname you the monkey. A banana is a tropical fruit that's quite popular all over the world. It grows in bunches on a banana tree.", price: 5, createdAt: new Date, updatedAt: new Date })

    await db.insert(products).values({ title: 'Ківі', imageUrl: 'https://images.pexels.com/photos/51312/kiwi-fruit-vitamins-healthy-eating-51312.jpeg?cs=srgb&dl=pexels-pixabay-51312.jpg&fm=jpg', description: "Плоди ківі мають зелений колір і багато маленьких насінин, що специфічно розташовані. Смак можна описати як щось середнє між аґрусом і полуницею. Фрукт дуже багатий на вітаміни, особливо А, В, С, мінеральні солі, а також дубильні речовини та ферменти, що розчиняють білок.", price: 99, createdAt: new Date, updatedAt: new Date })

    await db.insert(products).values({ title: 'Авокадо', imageUrl: 'https://californiaavocado.com/wp-content/uploads/2020/07/avocado-fruit-berry.jpg', description: "Звичай прикрашати лавровим вінком людей, що відзначилися в різних сферах людської діяльності, дістався сучасному людству від древніх еллінів, у яких лавр був присвячений Аполлону - богу мудрості, покровителю мистецтв. Листя лавра благородного (Laurus nobilis) здавна широко відоме як прянощі, його застосовують при виготовленні м’ясних та рибних консервів та для інших цілей. А от родича лавра благородного мексіканське вічнозелене дерево персею американську (Реrsеа аmеrісаnа), що також належить до родини лаврових (Lauraceае), мало хто знає. А між тим персея відома з глибокої давнини: при розкопках усипальниці фараона Рамзеса II, що правив Єгиптом близько 3000 років тому, знайдено ритуальні гірлянди з листків персеї. Рід персея (Реrsеа) включає 50 видів рослин, поширених переважно в тропічних і субтропічних країнах Америки та на Канарських островах. Цей рід представлений в основному деревами і лише зрідка кущами. Листки у персеї прості, чергові, більш-менш шкірясті.", price: 10, createdAt: new Date, updatedAt: new Date })

    await db.insert(products).values({ title: 'Пила', imageUrl: 'https://zhuk.ua/content/images/18/480x360l50nn0/pilka-po-pisko-pino-betonu-sturm-1060-06-55-11267573403991.jpg', description: "Пилка має вигляд стрічки (чи диска) з нарізаними на ній зубцями (різцями). Кожний зубець (рис. 1) пилки має три різальні кромки – одну передню коротку і дві бічні. Зубці пилок мають таки параметри: відстань між двома сусідніми вершинами є кроком, а відстань між основою 2 і вершиною 4 – висотою зубця. Для видалення тирси. Яка утворюються в процесі пиляння, призначена западина 5. Рис. 1. Елементи пили: 1 - бічні різальні кромки; 2 - лінія основи зубців пилки; 3 - полотно пилки; 4 - вершина зубця; 5 - пазуха, або западина зубця пилки; 6 - передня коротка різальна кромка; 7 - передня грань.", price: 19, createdAt: new Date, updatedAt: new Date })

}