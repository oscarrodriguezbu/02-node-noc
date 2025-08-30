//el repositorio va a tener el data source, lo va a llamar y se pueden trabajar cositas con lo que tenga adentro

import { LogEntity, LogSeverityLevel } from '../entities/log.entity';


export abstract class LogRepository {
  abstract saveLog( log: LogEntity ): Promise<void>;
  abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>;
}


