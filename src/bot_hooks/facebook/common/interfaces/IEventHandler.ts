"use strict"
interface IEventHandler<T> {
    Handle(data: T): void;
}