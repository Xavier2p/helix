import { Response, Request } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';
import uuid from '../tools/uuid';
import queries from '../database/queries';

const create = async (req: Request, res: Response) => {
    logger.post(req.originalUrl, 'REQ');
    let id = uuid();
    while (await queries.checkId(id, 'users')) id = uuid();
    const sqlQuery =
        'INSERT INTO appointments ' +
        '(`id`, `patientId`, `date`, `reasons`, `anamnesis`, `conclusion`, `status`, `payment`) VALUES (?)';
    const values = [
        id,
        req.body.patientId,
        req.body.date,
        req.body.reasons,
        JSON.stringify({ reasons: '', symptoms: '', knownDiseases: '', knownMedications: '' }),
        JSON.stringify({ diagnosis: '', treatment: '', observations: '' }),
        'pending',
        JSON.stringify({ amount: 0, method: 'card' }),
    ];

    db.query(sqlQuery, [values], (err: any, data: { insertId: any }) => {
        if (err) {
            logger.post(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json({ message: 'Method fails' });
        }
        logger.post(req.originalUrl, 'OK', `Appointment ${id} created`);
        return res.status(sc.OK).json({ id, message: `Appointment ${id} created` });
    });
};

const update = async (req: Request, res: Response) => {
    logger.put(req.originalUrl, 'REQ');
    const appointmentId = req.params.id;
    const sqlQuery =
        'UPDATE appointments ' + 'SET `anamnesis` = ?, `conclusion` = ?, `status` = ? , `payment` = ?' + 'WHERE id = ?';
    const values = [req.body.anamnesis, req.body.conclusion, 'finished', req.body.payment];

    db.query(sqlQuery, [...values, appointmentId], (err: any, data: any) => {
        if (err) {
            logger.put(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json({ message: 'Method fails' });
        }
        logger.put(req.originalUrl, 'OK', `Appointment ${appointmentId} updated`);
        return res.status(sc.OK).json({ message: `Appointment ${appointmentId} updated` });
    });
};

const getForView = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const appointmentId = req.params.id;
    const sqlQuery = `
    SELECT appointments.id, appointments.date, appointments.reasons, appointments.anamnesis, appointments.conclusion, appointments.payment, appointments.patientId, appointments.status, patients.name, patients.lastName, patients.email, patients.birthDate, patients.city, patients.sex, patients.passif 
    FROM appointments INNER JOIN patients ON appointments.patientId = patients.id
    WHERE appointments.id = ?
    `;
    db.query(sqlQuery, appointmentId, (err: any, data: any) => {
        if (err) {
            logger.get(req.originalUrl, 'ERR', err);
            return res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
        }
        logger.get(req.originalUrl, 'OK', `Return appointment ${appointmentId}`);
        return res.status(sc.OK).json(data);
    });
};

const getForEdit = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const appointmentId = req.params.id;
    const sqlQuery = `
    SELECT appointments.id, appointments.date, appointments.reasons, appointments.patientId, patients.name, patients.lastName, patients.email, patients.birthDate, patients.city, patients.sex, patients.passif 
    FROM appointments INNER JOIN patients ON appointments.patientId = patients.id
    WHERE appointments.id = ?
    `;
    db.query(sqlQuery, appointmentId, (err: any, data: any) => {
        if (err) {
            logger.get(req.originalUrl, 'ERR', err);
            return res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
        }
        logger.get(req.originalUrl, 'OK', `Return appointment ${appointmentId}`);
        return res.status(sc.OK).json(data);
    });
};

/**
const read = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const appointmentId = req.params.id;
    const sqlQuery = `
    SELECT *
    FROM appointments
    WHERE id = ?
    `;
    db.query(sqlQuery, appointmentId, (err: any, data: any) => {
        if (err) {
            logger.get(req.originalUrl, 'ERR', err);
            return res.status(sc.BAD_REQUEST).json(err);
        }
        logger.get(req.originalUrl, 'OK', `Return appointment ${appointmentId}`);
        return res.status(sc.OK).json(data);
    });
};
*/

export default module.exports = {
    create,
    update,
    getForView,
    getForEdit,
    // read,
};
