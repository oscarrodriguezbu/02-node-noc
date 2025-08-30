// cotniene los origenes de los datos,  o de donde vienen
// repository son las reglas de como va a llegar la data a la bd


import { LogEntity, LogSeverityLevel } from '../entities/log.entity';


export abstract class LogDatasource { // con abstract nadie puede crear una instancia de la clase
  abstract saveLog( log: LogEntity ): Promise<void>;
  abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>;
}