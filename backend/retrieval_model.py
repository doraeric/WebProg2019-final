#!/usr/bin/env python3
import json
import jieba
import pandas as pd
import numpy as np
import random
import csv
import operator
import argparse
from argparse import ArgumentParser
from collections import Counter

def init_retrieval():
    list(jieba.cut('新聞'))

def load_inv(fname):
    with open(fname) as f:
        invert_file = json.load(f)
    return invert_file

def retrieval(query, invert_file, num_corpus=100000, guess=True, **kwargs):
    # counting query term frequency
    query_cnt = Counter()
    query_words = list(jieba.cut(query))
    query_cnt.update(query_words)

    # calculate scores by tf-idf
    document_scores = dict() # record candidate document and its scores
    for (word, count) in query_cnt.items():
        if word in invert_file:
            query_tf = count
            idf = invert_file[word]['idf']
            idf = np.log(idf)
            for document_count_dict in invert_file[word]['docs']:
                for doc, doc_tf in document_count_dict.items():
                    doc_tf = 1+np.log(max(1, doc_tf))
                    query_tf = 1+np.log(max(1, query_tf))
                    if doc in document_scores:
                        document_scores[doc] += query_tf * idf * doc_tf * idf
                    else:
                        document_scores[doc] = query_tf * idf * doc_tf * idf

    # sort the document score pair by the score
    sorted_document_scores = sorted(document_scores.items(), key=operator.itemgetter(1), reverse=True)

    # record the answer of this query to final_ans
    if len(sorted_document_scores) >= 300:
        sorted_document_scores = [doc_score_tuple[0] for doc_score_tuple in sorted_document_scores[:300]]
    else: # if candidate documents less than 300, random sample some documents that are not in candidate list
        if guess:
            documents_set  = set([doc_score_tuple[0] for doc_score_tuple in sorted_document_scores])
            sample_pool = ['news_%06d'%news_id for news_id in range(1, num_corpus+1) if 'news_%06d'%news_id not in documents_set]
            sample_ans = random.sample(sample_pool, 300-len(sorted_document_scores))
            sorted_document_scores.extend([(i, 0) for i in sample_ans])
        sorted_document_scores = [doc_score_tuple[0] for doc_score_tuple in sorted_document_scores]
    return sorted_document_scores

def output(fname, final_ans):
    with open(fname, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        head = ['Query_Index'] + ['Rank_%03d'%i for i in range(1,301)]
        writer.writerow(head)
        for query_id, ans in enumerate(final_ans, 1):
            writer.writerow(['q_%02d'%query_id]+ans)

def main(inverted_file, query_file, corpus_file, output_file, **kwargs):
    invert_file = load_inv(inverted_file)
    # read query and news corpus
    querys = np.array(pd.read_csv(query_file)) # [(query_id, query), (query_id, query) ...]
    # corpus = np.array(pd.read_csv(corpus_file)) # [(news_id, url), (news_id, url) ...]
    # num_corpus = corpus.shape[0] # used for random sample
    # process each query
    final_ans = []
    for (query_id, query) in querys:
        print("query_id: {}".format(query_id))
        sorted_document_scores = retrieval(query, invert_file)
        final_ans.append(sorted_document_scores)
    output(output_file, final_ans)

if __name__ == '__main__':
    parser = ArgumentParser(argument_default=argparse.SUPPRESS)
    parser.add_argument("-i", "--inverted-file", default='inverted_file.json', help = "Pass in a .json file.")
    parser.add_argument("-q", "--query-file", default='QS_1.csv', help = "Pass in a .csv file.")
    parser.add_argument("-c", "--corpus-file", default='NC_1.csv', help = "Pass in a .csv file.")
    parser.add_argument("-o", "--output-file", default='sample_output.csv', help = "Pass in a .csv file.")
    args = parser.parse_args()

    main(**vars(args))
