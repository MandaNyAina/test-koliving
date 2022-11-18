import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AdsModule } from './ads/ads.module';
import { AppResolver } from './app.resolver';
import { TenantsModule } from './tenants/tenants.module';

@Module({
    imports: [
        AdsModule,
        TenantsModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
        }),
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGO_URL),
    ],
    controllers: [],
    providers: [AppResolver],
})
export class AppModule {}
