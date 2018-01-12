"use strict"
interface IEventHandler<T> {
    HandleAsync(data: T): void;
}