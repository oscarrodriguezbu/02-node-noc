import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';


const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource(),
);
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource(),
);


const emailService = new EmailService();


export class Server {

  public static async start() { // static es para que haga referencia a la clase y luego al metodo, por ej start.algo

    console.log('Server started...');

    //****************************** Mandar email ****************************
    //por medio del caso de uso:
    new SendEmailLogs(
      emailService, 
      fsLogRepository,
    ).execute(
      ['oscar69@gmail.com','oscar.herrera.cr@gmail.com'] // colocar un correo de verdad
    )

    //otra forma:
    // emailService.sendEmailWithFileSystemLogs(
    //   ['oscar.herrera85@gmail.com','oscar.herrera.cr@gmail.com']
    // );
    //*************************************************************************

    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    //****************************** multiples guardados de logs ****************************
    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'https://google.com';

    //     new CheckServiceMultiple(
    //       [fsLogRepository, postgresLogRepository, mongoLogRepository],
    //       () => console.log(`${url} is ok`),
    //       (error) => console.log(error),
    //     ).execute(url);
    //   }
    // );
    //****************************************************************************************

  }

}


