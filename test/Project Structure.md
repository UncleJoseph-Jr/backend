# Project Structure
```bash
.
├── prisma
│   ├── migrations
│   │   ├── 20241226102956_add_product_model
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── src
│   ├── auth
│   │   └── jwt-auth.guard.ts
│   ├── merchants
│   │   ├── dto
│   │   │   ├── create-merchant.dto.ts
│   │   │   └── update-merchant.dto.ts
│   │   ├── merchants.controller.ts
│   │   ├── merchants.module.ts
│   │   └── merchants.service.ts
│   ├── prisma
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── products
│   │   ├── dto
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   └── products.service.ts
│   ├── users
│   │   ├── dto
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── jwt-auth.guard.ts
│   │   ├── jwt.strategy.ts
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
├── uploads
│   └── products
│       └── example.jpg
├── .env
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```
```bash
nest g service 

nest g controller 

nest g module 

npx prisma migrate dev --name add_xxxx_model
```

# 1. ระบบจัดการสินค้า (Product Management)
- รายละเอียด: ให้ร้านค้าสามารถเพิ่ม แก้ไข ลบ และดูรายการสินค้าของตัวเองได้
- ฟังก์ชันที่ควรมี:
    - เพิ่ม/แก้ไข/ลบสินค้า
    - อัปโหลดรูปภาพสินค้า
    - จัดการหมวดหมู่สินค้า
    - ค้นหาและกรองสินค้า
- แนวทาง: สร้างตาราง products ในฐานข้อมูล และเชื่อมโยงกับ merchants ผ่าน foreign key
# 2. ระบบจัดการออเดอร์ (Order Management)
- รายละเอียด: ระบบที่ช่วยให้ร้านค้าสามารถจัดการคำสั่งซื้อได้
- ฟังก์ชันที่ควรมี:
    - ลูกค้าสามารถสั่งซื้อสินค้า
    - ร้านค้าสามารถดูรายการคำสั่งซื้อ (Pending, Confirmed, Delivered)
    - แจ้งเตือนเมื่อมีคำสั่งซื้อใหม่
    - ระบบติดตามสถานะคำสั่งซื้อ
- แนวทาง: สร้างตาราง orders และ order_items พร้อมสถานะ (e.g., Pending, Confirmed, Shipped, Delivered)
# 3. ระบบรีวิวและให้คะแนน (Review & Rating)
- รายละเอียด: ลูกค้าสามารถให้คะแนนและรีวิวร้านค้าได้
- ฟังก์ชันที่ควรมี:
    - ให้คะแนนร้านค้าและเขียนรีวิว
    - ร้านค้าสามารถตอบกลับรีวิวได้
    - ค้นหาและกรองร้านค้าตามคะแนนรีวิว
- แนวทาง: สร้างตาราง reviews เชื่อมโยงกับ merchants และ users
# 4. ระบบการชำระเงิน (Payment System)
- รายละเอียด: เพิ่มความสะดวกในการชำระเงิน เช่น การรองรับ e-wallet, บัตรเครดิต, หรือ QR Code
- ฟังก์ชันที่ควรมี:
    - รองรับช่องทางการชำระเงินหลากหลาย
    - สร้างใบเสร็จอัตโนมัติ
    - ระบบคืนเงิน (Refund)
- แนวทาง: ใช้บริการของ Third-Party Payment Gateway (e.g., Stripe, Omise, PayPal)
# 5. ระบบแผนที่และค้นหาร้านค้า (Map and Store Finder)
- รายละเอียด: ให้ลูกค้าสามารถค้นหาร้านค้าใกล้เคียงตามตำแหน่งปัจจุบัน
- ฟังก์ชันที่ควรมี:
    - ค้นหาร้านค้าตามตำแหน่ง
    - แสดงพิกัดร้านค้าในแผนที่
    -ระบบกรองร้านค้าตามหมวดหมู่
- แนวทาง: ใช้ Google Maps API หรือ OpenStreetMap
# 6. ระบบโปรโมชั่นและคูปอง (Promotions and Coupons)
- รายละเอียด: ช่วยเพิ่มยอดขายและดึงดูดลูกค้า
- ฟังก์ชันที่ควรมี:
    - สร้างโปรโมชั่นส่วนลด
    - ระบบแจกคูปองส่วนลดให้ลูกค้า
    - แสดงโปรโมชั่นที่กำลังดำเนินการอยู่
- แนวทาง: สร้างตาราง promotions และ coupons
7. ระบบแจ้งเตือน (Notification System)
- รายละเอียด: แจ้งเตือนร้านค้าและลูกค้าเมื่อเกิดเหตุการณ์สำคัญ
- ฟังก์ชันที่ควรมี:
    - แจ้งเตือนเมื่อมีคำสั่งซื้อใหม่
    - แจ้งเตือนสถานะคำสั่งซื้อ
    - แจ้งเตือนโปรโมชั่นใหม่
- แนวทาง: ใช้ Push Notification หรือ Email/SMS
# 8. ระบบจัดการสมาชิก (Membership/Subscription System)
- รายละเอียด: ให้ลูกค้าได้รับสิทธิพิเศษ เช่น ส่วนลด หรือบริการเพิ่มเติม
- ฟังก์ชันที่ควรมี:
    - ระบบสมัครสมาชิกแบบฟรี/เสียเงิน
    - ระบบติดตามวันหมดอายุสมาชิก
    - สิทธิพิเศษสำหรับสมาชิก
- แนวทาง: สร้างตาราง subscriptions


# 1. ระบบยืนยันอีเมล (Email Verification)
วัตถุประสงค์: เพื่อให้แน่ใจว่าผู้ใช้ใช้ที่อยู่อีเมลที่ถูกต้อง

วิธีการ:

เมื่อสมัครสมาชิก ให้สร้าง verificationToken สำหรับผู้ใช้ใหม่
ส่งลิงก์ยืนยันอีเมล (ที่มี verificationToken) ไปยังที่อยู่อีเมลที่ลงทะเบียน
เพิ่ม API สำหรับยืนยันอีเมล (/users/verify-email) โดยตรวจสอบ verificationToken ที่ถูกส่งมา
เปลี่ยนสถานะ isActive เป็น true เมื่อผู้ใช้ยืนยันอีเมลสำเร็จ
# 2. ลืมรหัสผ่าน (Password Reset)
วัตถุประสงค์: ช่วยให้ผู้ใช้สามารถรีเซ็ตรหัสผ่านเมื่อจำไม่ได้

วิธีการ:

เพิ่ม API สำหรับการร้องขอการรีเซ็ตรหัสผ่าน (/users/forgot-password)
สร้าง resetPasswordToken และส่งอีเมลให้ผู้ใช้พร้อมลิงก์ที่มีโทเค็นนี้
เพิ่ม API สำหรับการตั้งค่ารหัสผ่านใหม่ (/users/reset-password)
ตรวจสอบ resetPasswordToken และอนุญาตให้ผู้ใช้ตั้งรหัสผ่านใหม่
รีเซ็ต resetPasswordToken หลังจากการตั้งค่ารหัสผ่านสำเร็จ
# 3. เปลี่ยนรหัสผ่าน (Change Password)
วัตถุประสงค์: ให้ผู้ใช้ที่ล็อกอินอยู่สามารถเปลี่ยนรหัสผ่านได้

วิธีการ:

เพิ่ม API /users/change-password
ตรวจสอบรหัสผ่านปัจจุบัน
หากถูกต้อง ให้เปลี่ยนรหัสผ่านใหม่
# 4. ระบบ Role-Based Access Control (RBAC)
วัตถุประสงค์: กำหนดสิทธิ์การเข้าถึง API ตามบทบาท (role) ของผู้ใช้

วิธีการ:

ใช้ Guards ของ NestJS เพื่อตรวจสอบบทบาทก่อนเข้าถึง API
ตัวอย่าง:
Admin สามารถจัดการข้อมูลทั้งหมด
User เข้าถึงเฉพาะข้อมูลของตนเอง
Moderator ตรวจสอบและอนุมัติคำขอของผู้ใช้ได้บางส่วน
# 5. บันทึกการเข้าสู่ระบบ (Login History)
วัตถุประสงค์: เพื่อให้ระบบสามารถแสดงข้อมูลการล็อกอินย้อนหลัง

วิธีการ:

สร้าง Model ใหม่ชื่อ LoginHistory:
prisma
Copy code
model LoginHistory {
  id        Int      @id @default(autoincrement())
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  ip        String   // IP Address
  createdAt DateTime @default(now())
}
บันทึกข้อมูลการล็อกอิน (เช่น IP, วันเวลา) ทุกครั้งที่ผู้ใช้ล็อกอิน
เพิ่ม API เพื่อให้ผู้ใช้ดูประวัติการล็อกอินของตนเอง
# 6. ระบบ Profile Management
วัตถุประสงค์: ให้ผู้ใช้สามารถแก้ไขข้อมูลโปรไฟล์ของตัวเองได้

วิธีการ:

เพิ่ม API /users/update-profile เพื่อให้ผู้ใช้แก้ไขชื่อ อีเมล (และรูปโปรไฟล์ถ้ามี)
ใช้การตรวจสอบสิทธิ์ (Authentication) เพื่อให้เฉพาะเจ้าของบัญชีสามารถแก้ไขข้อมูลของตนเองได้
# 7. ระบบล็อกอินด้วย OAuth (Social Login)
วัตถุประสงค์: ให้ผู้ใช้ล็อกอินผ่าน Google, Facebook หรือแพลตฟอร์มอื่น ๆ ได้

วิธีการ:

ใช้ Passport.js ร่วมกับ nestjs/passport และ @nestjs/jwt
เพิ่ม OAuth Strategies (เช่น Google, Facebook)
รองรับการเชื่อมต่อบัญชีผู้ใช้ที่มีอยู่กับบัญชี Social
ฟีเจอร์ที่แนะนำเพิ่มเติม
การจัดการบัญชีผู้ใช้ (User Management Dashboard): สำหรับ Admin ในการแก้ไขหรือระงับบัญชีผู้ใช้
ระบบแจ้งเตือน (Notifications): เช่น แจ้งเตือนผู้ใช้ผ่านอีเมลเมื่อมีการเปลี่ยนแปลงรหัสผ่านหรือข้อมูลสำคัญ
