# Distributed System

This project wants to be an help for me to learn and improve some concepts related to distributed systems and the most useful patterns used in complex architectures.

## System Explained

The system is composed of 3 services:

- dashboard: the front end application for inserting and showing data.
- write-side: the service the handles the incoming requests (insert commands) from the front end.
- read-side: the service the handles the outcoming queries (get commands) to the front end.

The final goal is to have a system that can run on containers orchestrated by Kubernetes.
Through the dashboard will be possible to manage data and stop some services in order to see what happens to the system and its consistency.

### Architecture

The following picture shows the flow of the data through main components

![architecture](assets/images/architecture.jpg)

#### First Version Sequence Diagram

The following picture shows the sequence diagram for add command of the first version of the system, in which all components are supposed to be up without problem during the execution.

![v1sequencediagram](assets/images/first_version_sequence_diagram.jpg)

## References

## DDD

- https://culttt.com/2014/11/10/creating-using-command-bus/
