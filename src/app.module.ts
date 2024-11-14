import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [UserModule, DatabaseModule, EmployeesModule],
})
export class AppModule {}
