import React, { Component } from 'react' 

class Pagination extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage:props.currentPage || 1
        }
        this.prevPageClick = this.prevPageClick.bind(this)
        this.nextPageClick = this.nextPageClick.bind(this)
        //this.getPageData = this.getPageData.bind(this)
    }
    prevPageClick() {
        const { currentPage } = this.state
        let newPageNum
        if((currentPage - 1) <= 1) {
            newPageNum = currentPage
        } 
        newPageNum = currentPage - 1;
        
        this.setState({
            currentPage:newPageNum
        }, () => {  
            this.getPaginationNumbers()
            this.props.getPageData(newPageNum)
        })
    }
    nextPageClick() {
        const { currentPage } = this.state;
        let newPageNum;
        if((currentPage + 1) >= this.totalPages) {
            newPageNum = this.totalPages
        }
        newPageNum = currentPage + 1;

        this.setState({
            currentPage:newPageNum
        }, () => {
            this.getPaginationNumbers()
            this.props.getPageData(newPageNum)
        })
    }
    getPageData = (pagenum) => (e) => {
        this.props.getPageData(pagenum)
    }
    getPaginationNumbers() {
        let { currentPage } = this.state
        const { totalResults } = this.props
        let maxPages = 4
        let pageSize = 10
        this.totalPages = Math.floor(totalResults/pageSize)
        let startPage;
        let endPage;
        
        if(currentPage <=1) {
            currentPage = 1
        } else if(currentPage >= this.totalPages) {
            currentPage = this.totalPages
        }

        if(this.totalPages <= maxPages) {
            startPage = 1;
            endPage = this.totalPages
        } else {
            let pagesBeforeCurrentPage = Math.floor(maxPages/2)
            let pagesAfterCurrentPage = Math.ceil(maxPages/2) -1
            if(currentPage <= pagesBeforeCurrentPage) {
                startPage = 1;
                endPage = maxPages
            } else if(currentPage + pagesAfterCurrentPage >= this.totalPages) {
                startPage = this.totalPages - maxPages + 1
                endPage = this.totalPages
            }else {
                startPage = currentPage - pagesBeforeCurrentPage
                endPage = currentPage + pagesAfterCurrentPage
            }

        }
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map((i) => startPage + i)

        if(pages[0] > 1) {
            //previous = true
            pages.unshift('previous')
        }

        if(pages[pages.length - 1] < this.totalPages) {
            //next = true
            pages.push('next')
        }

        return pages
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.currentPage !== prevState.currentPage) {
            return {
                currentPage:nextProps.currentPage
            }
        } else {
            return null
        }
    }
    render() {
        const { currentPage } = this.state;
        const pageNumbers = this.getPaginationNumbers()
        return (
            <div>
                <ul className="flex justify-center">
                    {
                    pageNumbers.map((item,index) => {
                        if(item === 'previous') {
                            return (
                                <li key={`previous-${index}`} className="prev-page" onClick={this.prevPageClick}>previous</li>
                            )
                        }
                        if(item === 'next') {
                            return (
                                <li key={`next-${index}`} className="next-page" onClick={this.nextPageClick}>next</li>
                            )
                        }
                        return (
                            <li  key={`index-${item}`} className={item == currentPage ? 'active-page' : "numbers-page"} onClick={this.getPageData(item)}>{item}</li>
                        )
                    
                    })
                }
                </ul>
            </div>             
        )
    }
}

export default Pagination