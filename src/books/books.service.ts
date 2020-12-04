import {Injectable, HttpException } from '@nestjs/common'
import {BOOKS } from '../mocks/books.mock'

@Injectable()
export class BooksService {
  books = BOOKS;

  //get all
  getBooks(): Promise<any> {
    return new Promise(resolve => {
      resolve(this.books)
    })
  }
  // get by id
  getBook(bookID): Promise<any> { 
    let id = Number(bookID);
    return new Promise(resolve => {
      const book = this.books.find(book => book.id === id)
      if(!book) {
        throw new HttpException('Books not exist', 404)
      }
      resolve(book)
    })
  }
  // add book
  addBook(book): Promise<any> {
    return new Promise(resolve => [
      this.books.push(book)
      resolve(this.books)
    ])
  }
  //delete book
  deleteBook(bookID): Promise<any> {
    let id = Number(bookID);
    return new Promise(resolve => {
      let index = this.books.findIndex(book => book.id === id)
      if(index === -1 ){
        thow new HttpException('Books not exist!', 404)
      }
      this.books.splice(1, index)
      resolve(this.books)
    })
  }
}