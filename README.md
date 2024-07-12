This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [https://next-word-backend-1.onrender.com](https://next-word-backend-1.onrender.com) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Arquitectura de la app
![image](https://github.com/thonyDeveloperSoftware77/next-word-web/assets/122832433/1a6ec43e-2ec1-4ac6-bc5a-7da659d21c0a)

## Flujo  de login y rutas protegidas
![image](https://github.com/thonyDeveloperSoftware77/next-word-web/assets/122832433/8d51e225-3625-4fa9-b194-9171a7a10cb5)

## Funcionalidades:
1. CRUD de profesores:

    Permite crear, editar y eliminar profesores.
    Las entradas de datos se validan en el backend para garantizar la integridad de la información.

2. CRUD de cursos:

    Permite crear, editar y eliminar cursos.
    Las entradas de datos se validan en el backend para garantizar la integridad de la información.
   ![image](https://github.com/thonyDeveloperSoftware77/next-word-web/assets/122832433/d84dec5c-aecc-4d24-b277-c5b45d43b3b0)


4. CRUD de cards:

    Permite crear, editar y eliminar cards.
    Las entradas de datos se validan en el backend para garantizar la integridad de la información.
    La creación de cards se puede realizar de dos maneras:
    - Objeto individual: Permite crear una card individual especificando los parámetros necesarios.
      ![image](https://github.com/thonyDeveloperSoftware77/next-word-web/assets/122832433/2058e6ca-2bac-4760-8da5-1774e5df096a)

    - JSON de cards: Permite crear varias cards de forma masiva mediante un archivo JSON. Esta funcionalidad solo está disponible para cuentas de administrador y valida la información mediante tokens y variables de entorno.
    Las cards contienen los parámetros necesarios para el aprendizaje de inglés, como vocabulario y ejemplos.
![image](https://github.com/thonyDeveloperSoftware77/next-word-web/assets/122832433/8987d45a-ac8d-4dbd-b7ad-ade08db4bf9c)


5. CRUD de similar cards:

    Permite crear, editar y eliminar similar cards.
    Las entradas de datos se validan en el backend para garantizar la integridad de la información.
   ![image](https://github.com/thonyDeveloperSoftware77/next-word-web/assets/122832433/1f5635a0-b49f-43b6-b1d6-fe35e2fe12c6)


6. CRUD de estudiantes:

    Permite crear y manejar estudiantes por curso, con estados como activo, denegado, en espera.
    Las entradas de datos se validan en el backend para garantizar la integridad de la información.
   ![image](https://github.com/thonyDeveloperSoftware77/next-word-web/assets/122832433/d04126d2-6fae-4fb6-92a1-39f2c9bd2682)


   CORREO PARA ENTRAR AL ADMIN DE TEACHER
   CORREO:prueba1.1.1@gmail.com
   CONTRASEÑA: 12345678




# Patrones de Diseño
# Principios Solid Aplicados

1. Principio de Responsabilidad Única (SRP)
- NestJS fomenta el uso de módulos, controladores, servicios y otros componentes para separar las preocupaciones de la aplicación. Cada componente tiene una responsabilidad específica.

     Ejemplo:

        - Controladores: Manejan las solicitudes HTTP.
        - Servicios: Contienen la lógica de negocio.
        - Módulos: Agrupan controladores y servicios relacionados.


2. Principio de Inversión de Dependencias (Dependency Inversion Principle - DIP): 
- Uso de inyección de dependencias para desacoplar las clases y mejorar la testabilidad

# Patrones de Diseño

## 1. Patrón Singleton
Los servicios son singleton por defecto, proporcionando una única instancia compartida en toda la aplicación.

```typescript
// student.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
        @InjectRepository(StudentCourse)
        private courseStudentRepository: Repository<StudentCourse>,
        private firebaseRepository: FirebaseRepository
    ) { }

    // Métodos del servicio...
}
```

## 2. Patrón Inyección de Dependencias (Dependency Injection)
Facilita la creación y gestión de dependencias entre clases. NestJS lo hace de manera nativa usando el decorador `@Injectable()` en los servicios y la inyección de dependencias en el constructor.

```typescript
// firebase.repository.ts
import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseRepository {
  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {}

  async createUser(user: { email: string, password: string, role: 'admin' | 'teacher' | 'student' }) {
    // Crear el usuario en Firebase Authentication
  }
}
```

3. Patrón Modular: Organiza la aplicación en módulos reutilizables y bien encapsulados.

   
   - ![image](https://github.com/user-attachments/assets/5f6ec9e1-8612-4053-bd6d-b07bd3d78850)


## 4. Patrón Decorator
Utiliza decoradores para definir metadatos y comportamientos adicionales en las clases y métodos, en este caso se utilizo un decorador para sacar el uid del token que entra por el auth.

```typescript
//CREACION DEL DECORADOR
// user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

//USO DEL DECORADOR
@Get('/findOne')
    @UseGuards(FirebaseGuard)
    findOne(@User() user): Promise<Student> {
        return this.studentService.findOne(user.uid.uid);
    }
```

5. El Patrón Repository: actúa como un intermediario entre la lógica de negocio y la capa de acceso a datos. Proporciona una colección de objetos y métodos para trabajar con datos, generalmente almacenados en una base de datos, en este caso la interacción con la base de datos usando entidades de TypeORM
```typescript
// student.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student> //USO DEL REPOSITORY
    ) { }

    async findAll(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async findOne(uid: string): Promise<Student> {
        const student = await this.studentRepository.findOne({ where: { uid } });
        if (!student) {
            throw new ConflictException('Este estudiante no existe');
        }
        return student;
    }
}
```


   
   
